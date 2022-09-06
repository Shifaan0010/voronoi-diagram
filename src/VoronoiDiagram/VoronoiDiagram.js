import WebGLCanvas from '../WebGLCanvas/WebGLCanvas';

/**
 * Renders a voronoi diagram in a webgl canvas
 * @param {number} props.width width of canvas
 * @param {number} props.height height of canvas
 * @param {{x: number, y: number}[]} props.points list of points
 */
const VoronoiDiagram = (props) => {
    const vertex_source = `
        attribute vec2 pos;

        varying vec2 frag_pos;

        void main() {
        gl_Position = vec4(pos, 0, 1);
        frag_pos = pos;
        }
        `;

    const fragment_source = `
        precision highp float;

        varying vec2 frag_pos;

        uniform vec2 points[${props.points.length}];
        uniform vec4 colors[${props.points.length}];

        float d(vec2 a, vec2 b) {
            vec2 dif = abs(a - b);
            // return max(dif.x, dif.y);
            return dot(pow(dif, vec2(2.)), vec2(1.));
            // return dot(pow(vec2(2.), dif), vec2(1.));
        }

        void main() {
            // gl_FragColor = vec4(1, (frag_pos.x + 1.) / 2., (frag_pos.y + 1.) / 2., 1);

            float min_d = d(frag_pos, points[0]);
            vec4 min_color = colors[0];
            for (int i = 1; i < ${props.points.length}; i += 1) {
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
        <WebGLCanvas
            width={props.width}
            height={props.height}
            vertex_source={vertex_source}
            fragment_source={fragment_source}
            attributes={[
                {
                    name: 'pos',
                    values: [-1, -1, -1, 1, 1, -1, 1, 1, -1, 1, 1, -1],
                    size: 2,
                },
            ]}
            uniforms={[
                {
                    name: 'points',
                    type: 'vec2[]',
                    value: props.points.map(({x, y}) => [x, y]).reduce((a, b) => [...a, ...b], []),
                },
                {
                    name: 'colors',
                    type: 'vec4[]',
                    value: props.colors.map(({r, g, b, a}) => [r, g, b, a]).reduce((a, b) => [...a, ...b], []),
                },
            ]}
            vertex_count={6}
        ></WebGLCanvas>
    );
};

export default VoronoiDiagram;
