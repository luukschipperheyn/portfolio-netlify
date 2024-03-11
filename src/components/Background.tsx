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
-webkit-filter: url("#goo");
filter: url("#goo");
opacity: 0.2;
`


class Swimmer {
  path;
  direction;
  speed = 1;
  size;
  occupiedSteps = 0;
  maxSpeed;
  minSpeed;
  constructor() {
    this.size = 20 + Math.random() * 100;
    var point = new paper.Point(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );
    this.path = new paper.Path.Circle(point, this.size);
    this.direction = Math.random() * Math.PI * 2;
    this.maxSpeed = 1.5 + Math.random() * 0.5;
    this.minSpeed = 0.001 + Math.random() * 0.016;
  }

  isOutOfBounds(position) {
    // console.log(position.x, position.y, window.innerWidth, window.innerHeight)
    return (
      position.x < -0 ||
      position.x > window.innerWidth + 0 ||
      position.y < -0 ||
      position.y > window.innerHeight + 0
    );
  }

  isCollidingWithElement(position) {
    return $(document.elementsFromPoint(position.x, position.y)).hasClass(
      "collide"
    );
  }

  isOccupied(position) {
    return (
      this.isOutOfBounds(position) || this.isCollidingWithElement(position)
    );

    // const hitTest = viewLayer.hitTestAll(position);
    // if (hitTest && hitTest.length > 1 && Math.random() > 0.1) {
    //   this.occupiedSteps++;
    //   return true;
    // }
    // return false;
  }

  getNewPosition(shouldMove) {
    const generate = () => {
      let point = new paper.Point(
        this.path.position.x + Math.cos(this.direction) * (this.speed * 10),
        this.path.position.y + Math.sin(this.direction) * (this.speed * 10)
      );
      if (this.isOutOfBounds(point)) {
        point = point.add(paper.view.center.subtract(this.path.position).divide(20));
      }
      return point;
    };
    let newPosition = generate();
    let attempt = 0;
    while (this.isOccupied(newPosition) && attempt < 3) {
      this.direction += (Math.random() - 0.5) * (shouldMove ? 0.1 : 0.1);
      newPosition = generate();
      attempt++;
    }
    if (!shouldMove && this.isOccupied(newPosition)) {
      this.direction += Math.PI;
    }
    return newPosition;
  }

  update() {
    const shouldMove = this.isOccupied(this.path.position);
    if (shouldMove) {
      this.speed = Math.min(
        this.maxSpeed,
        this.speed * (1.5 + Math.random() * 0.1)
      );
    } else {
      this.speed = Math.max(
        this.minSpeed,
        this.speed * (0.8 + Math.random() * 0.1)
      );
    }
    {
      const newPosition = this.getNewPosition(shouldMove);
      this.path.position = newPosition;
    }
  }
}

export const Background: React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const swimmersRef = useRef<Swimmer[]>([])

  useEffect(() => {
    window.addEventListener('load', () => {
      if (!canvasRef.current) return;
      paper.setup(canvasRef.current);

      paper.project.currentStyle = {
        fillColor: "white",
      };

      for (let i = 0; i < 100; i++) {
        swimmersRef.current.push(new Swimmer());
      }
      paper.view.onFrame = () => {
        for (let i = 0; i < swimmersRef.current.length; i++) {
          swimmersRef.current[i].update();
        }
        paper.view.draw();
      };
    })
  }, [])


  return (<StyledContainer className="background">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="32" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -11"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
    <StyledCanvas id="myCanvas" ref={canvasRef} />
  </StyledContainer>)

}
