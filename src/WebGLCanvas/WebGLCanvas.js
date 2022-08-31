import React, { useEffect, useRef } from 'react';

const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
};

const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
};

// props = {vertex_shader_source: string, fragment_shader_source: string, attributes: [{name: string, size: int, values: array}], uniforms: [] vertex_count: int}
const WebGLCanvas = (props) => {
    const canvasRef = useRef();

    // runs after component is mounted
    useEffect(() => {
        if (canvasRef.current) {
            const gl_context = canvasRef.current.getContext('webgl');

            // compile vertex shader
            const vertex_shader = createShader(
                gl_context,
                gl_context.VERTEX_SHADER,
                props.vertex_shader_source
            );

            // compile fragment shader
            const fragment_shader = createShader(
                gl_context,
                gl_context.FRAGMENT_SHADER,
                props.fragment_shader_source
            );

            // attach shaders
            const program = createProgram(
                gl_context,
                vertex_shader,
                fragment_shader
            );

            gl_context.useProgram(program);

            // create and bind buffers
            for (let attribute of props.attributes) {
                const gl_buffer = gl_context.createBuffer();
                gl_context.bindBuffer(gl_context.ARRAY_BUFFER, gl_buffer);
                gl_context.bufferData(
                    gl_context.ARRAY_BUFFER,
                    new Float32Array(attribute.values),
                    gl_context.STATIC_DRAW
                );

                const gl_attribute_location = gl_context.getAttribLocation(
                    program,
                    attribute.name
                );
                gl_context.enableVertexAttribArray(gl_attribute_location);
                gl_context.vertexAttribPointer(
                    gl_attribute_location,
                    attribute.size, // size - 2D vector
                    gl_context.FLOAT, // type
                    false, // normalize
                    0, // = size * sizeof(gl.FLOAT)
                    0 // offset
                );
            }

            for (let uniform of props.uniforms) {
                const uniform_location = gl_context.getUniformLocation(
                    program,
                    uniform.name
                );

                if (uniform.type == 'float') {
                    gl_context.uniform1f(uniform_location, uniform.value);
                } else if (uniform.type == 'float[]') {
                    gl_context.uniform1fv(uniform_location, uniform.value);
                } else if (uniform.type == 'vec2') {
                    gl_context.uniform2f(uniform_location, uniform.value);
                } else if (uniform.type == 'vec2[]') {
                    gl_context.uniform2fv(uniform_location, uniform.value);
                } else if (uniform.type == 'vec4[]') {
                    gl_context.uniform4fv(uniform_location, uniform.value);
                }
            }

            // function render() {
            gl_context.viewport(
                0,
                0,
                gl_context.canvas.width,
                gl_context.canvas.height
            );

            gl_context.clearColor(0, 0, 0, 1);
            gl_context.clear(gl_context.COLOR_BUFFER_BIT);
            gl_context.useProgram(program);

            gl_context.drawArrays(
                gl_context.TRIANGLES, // primitive
                0, // offset
                props.vertex_count // count
            );
            // }

            console.log(gl_context);
        }
    });

    return (
        <>
            <canvas
                ref={canvasRef}
                width={props.width}
                height={props.height}
            ></canvas>
        </>
    );
};

export default WebGLCanvas;
