import * as THREE from "three";

interface ObjData {
  vertices: THREE.Vector3[];
  faces: number[][];
}

export class OBJTopologyProjection {
  private objData: ObjData | null = null;
  private rotation: THREE.Euler = new THREE.Euler(0, 0, 0);
  private aspectRatio: number = 1;

  constructor() {}

  public async loadOBJ(filePath: string): Promise<void> {
    const data = await fetch(filePath).then((response) => response.text());
    this.parseOBJData(data);
  }

  public loadOBJFromText(text: string): void {
    this.parseOBJData(text);
  }

  private parseOBJData(data: string): void {
    const vertices: THREE.Vector3[] = [];
    const faces: number[][] = [];

    const lines = data.split("\n");
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts[0] === "v") {
        vertices.push(
          new THREE.Vector3(
            parseFloat(parts[1]),
            parseFloat(parts[2]),
            parseFloat(parts[3])
          )
        );
      } else if (parts[0] === "f") {
        faces.push(
          parts.slice(1).map((p: string) => parseInt(p.split("/")[0], 10) - 1)
        );
      }
    }

    this.objData = { vertices, faces };
  }

  private rotateVertices(): THREE.Vector3[] {
    if (!this.objData) throw new Error("OBJ data is not loaded");
    const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(
      this.rotation
    );
    return this.objData.vertices.map((vertex) =>
      vertex.clone().applyMatrix4(rotationMatrix)
    );
  }

  private projectVertices(
    vertices: THREE.Vector3[],
    scaleFactor: number
  ): { vertex: THREE.Vector2; depth: number }[] {
    const projected = vertices.map((vertex) => ({
      vertex: new THREE.Vector2(vertex.x, vertex.y),
      depth: vertex.z,
    }));

    // Find the min and max values for normalization in a single loop
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    for (const { vertex } of projected) {
      if (vertex.x < minX) minX = vertex.x;
      if (vertex.x > maxX) maxX = vertex.x;
      if (vertex.y < minY) minY = vertex.y;
      if (vertex.y > maxY) maxY = vertex.y;
    }

    // Normalize and scale vertices in a single step
    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const normalizedAndScaledVertices = projected.map(({ vertex, depth }) => ({
      vertex: new THREE.Vector2(
        ((vertex.x - minX) / rangeX) * scaleFactor,
        ((vertex.y - minY) / rangeY) * scaleFactor
      ),
      depth,
    }));

    return normalizedAndScaledVertices;
  }

  private renderProjection(
    vertices: { vertex: THREE.Vector2; depth: number }[],
    faces: number[][],
    dimension: number
  ): number[][] {
    const canvasSize = dimension;
    const canvas = Array.from({ length: canvasSize }, () =>
      Array(canvasSize).fill(0)
    );

    const depthBuffer = Array.from({ length: canvasSize }, () =>
      Array(canvasSize).fill(Infinity)
    );

    // Pre-compute scaling factors
    const scaleX = canvasSize - 1;
    const scaleY = (canvasSize - 1) * this.aspectRatio;

    for (const face of faces) {
      const faceVertices = face.map((index) => vertices[index]);

      // Scale to canvas size and center
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
      for (const { vertex } of faceVertices) {
        if (vertex.x < minX) minX = vertex.x;
        if (vertex.x > maxX) maxX = vertex.x;
        if (vertex.y < minY) minY = vertex.y;
        if (vertex.y > maxY) maxY = vertex.y;
      }

      const startX = Math.max(0, Math.floor(minX * scaleX));
      const endX = Math.min(canvasSize, Math.ceil(maxX * scaleX));
      const startY = Math.max(0, Math.floor(minY * scaleY));
      const endY = Math.min(canvasSize, Math.ceil(maxY * scaleY));

      for (let x = startX; x < endX; x++) {
        for (let y = startY; y < endY; y++) {
          const depth =
            faceVertices.reduce((sum, { vertex, depth }) => sum + depth, 0) /
            faceVertices.length;
          if (depth < depthBuffer[y][x]) {
            depthBuffer[y][x] = depth;
            canvas[y][x] += 1; // Note: y and x swapped to match matrix [row][column] convention
          }
        }
      }
    }

    const maxDensity = Math.max(...canvas.flat());
    const scaleDensity = 70 / maxDensity; // Combine scaling and ceiling operations

    return canvas.map((row) =>
      row.map((value) => Math.ceil(value * scaleDensity) + 1)
    );
  }

  public getProjectionMatrix(
    dimension: number,
    scaleFactor: number = 1
  ): number[][] {
    this.aspectRatio = dimension / dimension; // Aspect ratio set based on dimension
    const rotatedVertices = this.rotateVertices();
    const projectedVertices = this.projectVertices(
      rotatedVertices,
      scaleFactor
    );
    return this.renderProjection(
      projectedVertices,
      this.objData!.faces,
      dimension
    );
  }

  public setRotation(angle: THREE.Euler): void {
    this.rotation = angle;
  }
}

export async function loadFile(
  filePath: string
): Promise<OBJTopologyProjection> {
  const objProjection = new OBJTopologyProjection();

  if (filePath.startsWith("blob:")) {
    const response = await fetch(filePath);
    const text = await response.text();
    objProjection.loadOBJFromText(text);
  } else {
    await objProjection.loadOBJ(filePath);
  }

  return objProjection;
}

export function setRotation(angle: number, obj: OBJTopologyProjection): void {
  obj.setRotation(new THREE.Euler(180, angle * (Math.PI / 180), 0));
}
