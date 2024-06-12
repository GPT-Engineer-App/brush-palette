import React, { useRef, useState } from "react";
import { Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [brushSize, setBrushSize] = useState(brushSizes[0]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Box position="relative" height="100vh" width="100vw">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block" }}
      />
      <Flex
        position="absolute"
        bottom={0}
        width="100%"
        bg="rgba(255, 255, 255, 0.8)"
        p={4}
        justifyContent="center"
      >
        <HStack spacing={4}>
          {colors.map((c) => (
            <Button
              key={c}
              onClick={() => setColor(c)}
              bg={c}
              border={color === c ? "2px solid black" : "none"}
              borderRadius="50%"
              p={4}
              minW="40px"
              minH="40px"
            />
          ))}
        </HStack>
        <HStack spacing={4} ml={8}>
          {brushSizes.map((size) => (
            <Button
              key={size}
              onClick={() => setBrushSize(size)}
              border={brushSize === size ? "2px solid black" : "none"}
              borderRadius="50%"
              p={4}
              minW="40px"
              minH="40px"
            >
              <FaCircle size={size} />
            </Button>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Index;