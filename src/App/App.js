import { useState } from 'react';
import style from './App.css';
import VoronoiDiagram from '../VoronoiDiagram/VoronoiDiagram';

const width = 600;
const height = 600;

const App = () => {
    const points = [];

    const [px, set_x] = useState(100);
    const [py, set_y] = useState(100);

    const [dragged, set_dragged] = useState(false);
    const [mouse_start, set_mouse_start] = useState({ x: 0, y: 0 });
    const drag_start = (e) => {
        console.log('Drag start');
        set_mouse_start({ x: e.pageX, y: e.pageY });
        set_dragged(true);
    };

    const drag_move = (e) => {
        if (dragged) {
            console.log('Drag move');
            set_x(px + (e.pageX - mouse_start.x));
            set_y(py + (e.pageY - mouse_start.y));
            set_mouse_start({ x: e.pageX, y: e.pageY });
        }
    };

    const drag_end = (e) => {
        console.log('Drag end');
        set_mouse_start({ x: e.pageX, y: e.pageY });
        set_dragged(false);
    };

    return (
        <div className={style.App} style={{ position: 'relative' }}>
            <VoronoiDiagram
                width={width}
                height={height}
                points={[
                    { x: 2 * (px / 600) - 1, y: 2 * (1 - py / 600) - 1 },
                    { x: 0.5, y: 0.5 },
                    { x: -0.5, y: 0.5 },
                    { x: 0.5, y: -0.5 },
                    { x: -0.5, y: -0.5 },
                ]}
                colors={[
                    { r: 1, g: 1, b: 0, a: 1 },
                    { r: 1, g: 0, b: 0, a: 1 },
                    { r: 0, g: 1, b: 0, a: 1 },
                    { r: 0, g: 0, b: 1, a: 1 },
                    { r: 0, g: 1, b: 1, a: 1 },
                ]}
            />

            <svg
                width={width}
                height={height}
                style={{ position: 'absolute', top: 0, left: 0 }}
                viewBox="0 0 600 600"
                xmlns="http://www.w3.org/2000/svg"

                onMouseMove={drag_move}
                onMouseUp={drag_end}
            >
                <circle
                    id="1a"
                    // cx={(px + 1) / 2}
                    // cy={1 - (py + 1) / 2}
                    cx={px}
                    cy={py}
                    r={600 * 0.01}
                    onMouseDown={drag_start}
                    // onMouseLeave={drag_end}
                ></circle>
            </svg>
        </div>
    );
};

export default App;
