/**
 * Sigma.js WebGL Renderer Fast Edge Program
 * ==========================================
 *
 * Program rendering edges using GL_LINES which is presumably very fast but
 * won't render thickness correctly on some GPUs and has some quirks.
 * @module
 */
import { Attributes } from "graphology-types";

import { EdgeDisplayData, NodeDisplayData, RenderParams } from "sigma/types";
import { floatColor } from "sigma/utils";
import { EdgeProgram } from "sigma/rendering";
import { ProgramInfo } from "sigma/rendering";
import FRAGMENT_SHADER_SOURCE from "./frag.glsl.ts";
import VERTEX_SHADER_SOURCE from "./vert.glsl.ts";

const { UNSIGNED_BYTE, FLOAT } = WebGLRenderingContext;

const UNIFORMS = [
  "u_matrix",
  "u_sizeRatio",
  "u_correctionRatio"
] as const;

export default class EdgeLoopProgram<
  N extends Attributes = Attributes,
  E extends Attributes = Attributes,
  G extends Attributes = Attributes,
> extends EdgeProgram<(typeof UNIFORMS)[number], N, E, G> {
  getDefinition() {
    return {
      VERTICES: 2160,
      VERTEX_SHADER_SOURCE,
      FRAGMENT_SHADER_SOURCE,
      METHOD: WebGLRenderingContext.TRIANGLES,
      UNIFORMS,
      ATTRIBUTES: [
        { name: "a_position_source", size: 2, type: FLOAT },
        { name: "a_alpha_deg", size: 1, type: FLOAT },
        { name: "a_outer", size: 1, type: FLOAT },
        { name: "a_color", size: 4, type: UNSIGNED_BYTE, normalized: true },
        { name: "a_id", size: 4, type: UNSIGNED_BYTE, normalized: true },
      ],
    };
  }

  processVisibleItem(
    edgeIndex: number,
    startIndex: number,
    sourceData: NodeDisplayData,
    targetData: NodeDisplayData,
    data: EdgeDisplayData,
  ) {
    const array = this.array;

    const sourceX = sourceData.x;
    const sourceY = sourceData.y;
    const color = floatColor(data.color);

    const addPointToArray = (alphaDeg, outer) => {
      array[startIndex++] = sourceX;
      array[startIndex++] = sourceY;
      array[startIndex++] = alphaDeg;
      array[startIndex++] = outer;
      array[startIndex++] = color;
      array[startIndex++] = edgeIndex;
    };

    let alphaDegInc = 1;
    for (let alphaDeg = 0; alphaDeg < 360; alphaDeg += alphaDegInc) {

      //First triangle
      addPointToArray(alphaDeg, 1);
      addPointToArray(alphaDeg + alphaDegInc, 1);
      addPointToArray(alphaDeg + alphaDegInc, 0);

      //Second triangle
      addPointToArray(alphaDeg, 0);
      addPointToArray(alphaDeg, 1);
      addPointToArray(alphaDeg + alphaDegInc, 0);

    }

  }

  setUniforms(params: RenderParams, { gl, uniformLocations }: ProgramInfo): void {
    const { u_matrix, u_correctionRatio, u_sizeRatio } =
      uniformLocations;

    gl.uniformMatrix3fv(u_matrix, false, params.matrix);
    gl.uniform1f(u_sizeRatio, params.sizeRatio);
    gl.uniform1f(u_correctionRatio, params.correctionRatio);
  }
}