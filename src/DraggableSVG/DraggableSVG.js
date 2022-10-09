import React from 'react';

/**
 * Creates an svg with draggable components, to make a component draggable, pass draggable=true as a prop
 * @example
 * <DraggableSVG>
 *     <circle cx={10} cy={20} draggable={true}/>
 * </DraggableSVG>
 */
const DraggableSVG = (props) => {
    React.Children.map(props.children, (c, i) => {
        
        console.log(c, i)
    });

    return <svg {...props}>{props.children}</svg>;
};

export default DraggableSVG;
