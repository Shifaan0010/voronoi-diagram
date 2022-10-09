import React, { useState } from 'react';
import style from './App.module.css';
import VoronoiDiagram from '../VoronoiDiagram/VoronoiDiagram';
import DraggableSVG from '../DraggableSVG/DraggableSVG'

const width = 600;
const height = 600;

const App = () => {
    const points = [];

    const [px, set_x] = useState(250);
    const [py, set_y] = useState(320);

    const [dragged, set_dragged] = useState(false);
    const [mouse_start, set_mouse_start] = useState({ x: 0, y: 0 });
    const drag_start = (e) => {
        console.log('Drag start', e.target);
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
        <div className={style.App} style={{ position: 'relative', height: height }}>
            <VoronoiDiagram
                width={width}
                height={height}
                style={{ position: 'absolute', top: 0, left: 0 }}
                points={[
                    { x: 2 * (px / width) - 1, y: 2 * (1 - py / height) - 1 },
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

            <DraggableSVG
                width={width}
                height={height}
                style={{ position: 'absolute', top: 0, left: 0 }}
                viewBox={`0 0 ${width} ${height}`}

                onMouseMove={drag_move}
                onMouseUp={drag_end}
            >
                <circle
                    id="1a"
                    // cx={(px + 1) / 2}
                    // cy={1 - (py + 1) / 2}
                    cx={px}
                    cy={py}
                    r={Math.min(width, height) * 0.01}
                    // fill="rgba(0, 0, 0, 0)"
                    // stroke="black"
                    strokeWidth={0.005 * Math.min(width, height)}
                    onMouseDown={drag_start}
                    style={{zIndex: 1}}
                    key={1}
                />
            </DraggableSVG>
        </div>
    );
};

export default App;
