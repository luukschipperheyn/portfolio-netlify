import $ from 'jquery';
import React, { useEffect, useRef } from "react";
import styled from "styled-components";


const StyledContainer = styled.div`
background: #777799;
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
z-index: -1;
`
const StyledCanvas = styled.canvas`
width: 100%;
height: 100%;
`
export const Background: React.FC = () => {

  const pathsRef = useRef<any>([])
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    window.addEventListener('load', () => {
      if (!canvasRef.current) return;
      paper.setup(canvasRef.current);
      for (let i = 0; i < 200; i++) {
        var path = new paper.Path.Circle(new paper.Point(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight),
          10);
        path.fillColor = new paper.Color("#7790a0")
        path.data.direction = Math.random() * Math.PI * 2;
        pathsRef.current.push(path);
      }
      paper.view.onFrame = () => {
        for (let i = 0; i < 200; i++) {
          var path = pathsRef.current[i];
          const el = document.elementsFromPoint(path.position.x, path.position.y);
          const $el = $(el);
          if ($el.hasClass("collide")) {
            path.position = new paper.Point(
              Math.abs(path.position.x + Math.cos(path.data.direction) * 10),
              Math.abs(path.position.y + Math.sin(path.data.direction) * 10)
            );
            path.data.direction += Math.random() * 0.001;
          } else {
            path.position = new paper.Point(
              Math.abs(path.position.x + Math.cos(path.data.direction) * 0.05),
              Math.abs(path.position.y + Math.sin(path.data.direction) * 0.05)
            );
            path.data.direction += (Math.random() - 0.5) * 0.2;
          }
        }

        paper.view.draw()
      };
    })
  }, [])


  return (<StyledContainer className="background">
    <StyledCanvas id="myCanvas" ref={canvasRef} />
  </StyledContainer>)

}
