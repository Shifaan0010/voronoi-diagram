import './App.css';
import WebGLCanvas from '../WebGLCanvas/WebGLCanvas';

const App = () => {
    const vertex_shader_source = `
attribute vec2 pos;

varying vec2 frag_pos;

void main() {
  gl_Position = vec4(pos, 0, 1);
  frag_pos = pos;
}
`;

    const fragment_shader_source = `
precision highp float;

varying vec2 frag_pos;

uniform vec2 points[4];
uniform vec4 colors[4];

float d(vec2 a, vec2 b) {
  vec2 dif = abs(a - b);
  return dot(dif, dif);
}

void main() {
    // gl_FragColor = vec4(1, (frag_pos.x + 1.) / 2., (frag_pos.y + 1.) / 2., 1);

    float min_d = d(frag_pos, points[0]);
    vec4 min_color = colors[0];
    for (int i = 0; i < 4; i += 1) {
      float dist = d(frag_pos, points[i]);
      if (dist < min_d) {
        min_color = colors[i];
        min_d = dist;
      }
    }

    gl_FragColor = min_color;
}
`;

    return (
        <div className="App">
            <WebGLCanvas
                width={400}
                height={400}
                vertex_shader_source={vertex_shader_source}
                fragment_shader_source={fragment_shader_source}
                attributes={[
                  {
                    name: 'pos',
                    values: [-1, -1, -1, 1, 1, -1, 1, 1, -1, 1, 1, -1],
                    size: 2
                  }
                ]}
                uniforms={[
                  {name: 'points', type: 'vec2[]', value: [0, 0, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5]},
                  {name: 'colors', type: 'vec4[]', value: [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1]}
                ]}
                vertex_count={6}
            ></WebGLCanvas>
        </div>
    );
};

export default App;
