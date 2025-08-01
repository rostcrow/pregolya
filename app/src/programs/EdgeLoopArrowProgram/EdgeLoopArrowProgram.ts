
// IMPORT
// Sigma.js
import { EdgeDisplayData, NodeDisplayData, RenderParams } from "sigma/types";
import { floatColor } from "sigma/utils";
import { EdgeProgram } from "sigma/rendering";
import { ProgramInfo } from "sigma/rendering";

// Graphology
import { Attributes } from "graphology-types";

// My classes
import FRAGMENT_SHADER_SOURCE from "./frag.glsl.ts";
import VERTEX_SHADER_SOURCE from "./vert.glsl.ts";

// CODE
/* 
  Code taken from Sigma.js GitHub and modified to fulfill my needs.
*/
const { UNSIGNED_BYTE, FLOAT } = WebGLRenderingContext;

const UNIFORMS = [
  "u_matrix",
  "u_sizeRatio",
  "u_correctionRatio"
] as const;

export default class EdgeLoopArrowProgram<
  N extends Attributes = Attributes,
  E extends Attributes = Attributes,
  G extends Attributes = Attributes,
> extends EdgeProgram<(typeof UNIFORMS)[number], N, E, G> {
  getDefinition() {
    return {
      VERTICES: 2163,
      VERTEX_SHADER_SOURCE,
      FRAGMENT_SHADER_SOURCE,
      METHOD: WebGLRenderingContext.TRIANGLES,
      UNIFORMS,
      ATTRIBUTES: [
        { name: "a_position_source", size: 2, type: FLOAT },
        { name: "a_alpha_deg", size: 1, type: FLOAT },
        { name: "a_outer", size: 1, type: FLOAT },
        { name: "a_color", size: 4, type: UNSIGNED_BYTE, normalized: true },
        { name: "a_size", size: 1, type: FLOAT},
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
    const size = data.size;

    const addPointToArray = (alphaDeg, outer) => {
      array[startIndex++] = sourceX;
      array[startIndex++] = sourceY;
      array[startIndex++] = alphaDeg;
      array[startIndex++] = outer;
      array[startIndex++] = color;
      array[startIndex++] = size;
      array[startIndex++] = edgeIndex;
    };

    // Making ring
    let alphaDegInc = 1;
    for (let alphaDeg = 0; alphaDeg < 360; alphaDeg += alphaDegInc) {

      // First triangle
      addPointToArray(alphaDeg, 1);
      addPointToArray(alphaDeg + alphaDegInc, 1);
      addPointToArray(alphaDeg + alphaDegInc, 0);

      // Second triangle
      addPointToArray(alphaDeg, 0);
      addPointToArray(alphaDeg, 1);
      addPointToArray(alphaDeg + alphaDegInc, 0);

    }

    /*
    *   Arrow triangle
    *
    *   Outer is set to 2 to distinguish from previous triangles.
    *   AlphaDeg here is rather triangle vertex index.
     */

    addPointToArray(0.0, 2);
    addPointToArray(1.0, 2);
    addPointToArray(2.0, 2);

  }

  setUniforms(params: RenderParams, { gl, uniformLocations }: ProgramInfo): void {
    const { u_matrix, u_correctionRatio, u_sizeRatio } =
      uniformLocations;

    gl.uniformMatrix3fv(u_matrix, false, params.matrix);
    gl.uniform1f(u_sizeRatio, params.sizeRatio);
    gl.uniform1f(u_correctionRatio, params.correctionRatio);
  }
}