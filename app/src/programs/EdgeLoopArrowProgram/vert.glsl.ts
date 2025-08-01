// language=GLSL
const SHADER_SOURCE = /*glsl*/ `
attribute vec4 a_id;
attribute float a_size;
attribute vec4 a_color;
attribute float a_outer;
attribute float a_alpha_deg;
attribute vec2 a_position_source;

uniform mat3 u_matrix;
uniform float u_sizeRatio;
uniform float u_correctionRatio;

varying vec4 v_color;

const float bias = 255.0 / 254.0;

void main() {

  const float outer_radius = 0.1;
  float inner_radius = outer_radius - (2.0 * a_size) * u_correctionRatio / u_sizeRatio;
  
  float sizeRatioInv = max(1.0 / u_sizeRatio, 1.0);
  float ratio = u_correctionRatio * sizeRatioInv;

  vec2 final_position;

  if (a_outer == 1.0) {
    final_position.x = outer_radius * cos(radians(a_alpha_deg)) + a_position_source.x - outer_radius;
    final_position.y = outer_radius * sin(radians(a_alpha_deg)) + a_position_source.y;
  } else if (a_outer == 0.0) {
    final_position.x = inner_radius * cos(radians(a_alpha_deg)) + a_position_source.x - outer_radius;
    final_position.y = inner_radius * sin(radians(a_alpha_deg)) + a_position_source.y;
  } else {
    if (a_alpha_deg == 0.0) {
        final_position.x = a_position_source.x + sqrt(0.1 * ratio);
        final_position.y = a_position_source.y + sqrt(1.7 * ratio);
    } else if (a_alpha_deg == 1.0) {
        final_position.x = a_position_source.x - sqrt(1.5 * ratio);
        final_position.y = a_position_source.y + sqrt(1.7 * ratio);
    } else {
        final_position.x = a_position_source.x;
        final_position.y = a_position_source.y;
    }
  }

  // Scale from [[-1 1] [-1 1]] to the container:
  gl_Position = vec4(
    (u_matrix * vec3(final_position, 1)).xy,
    0,
    1
  );

  #ifdef PICKING_MODE
  // For picking mode, we use the ID as the color:
  v_color = a_id;
  #else
  // For normal mode, we use the color:
  v_color = a_color;
  #endif

  v_color.a *= bias;
}
`;

export default SHADER_SOURCE;