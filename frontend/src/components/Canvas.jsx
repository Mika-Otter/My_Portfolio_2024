import React, { useRef, useEffect, useState, useContext } from "react";
import { HandleInput } from "../gameLogic/InputManager";
import { gameAnimate } from "../gameLogic/GameAnimate";
import {
  useBackgroundHeight,
  useSetBackgroundHeight,
} from "../context/BackgroundHeightContext";
import { Game } from "../gameLogic/GameInit";

export default function Canvas({
  isPlayed,
  toExp,
  RoomLevel,
  changeRoom,
  handleNextLevel,
  nextLevel,
  handleGoToHome,
  goToHome,
  changeRoomOne,
  contact,
  isMenu,
  isOpenProject,
  handleIsDialog,
  activeCatSecret,
  activeRobotSecret,
  testRef,
  eatingMushroomEffect,
  handleContact,
  addFoundSecrets,
}) {
  const canvasRef = useRef(null);
  const setBackgroundHeight = useSetBackgroundHeight();
  const [keysTab, setKeysTab] = useState([]);
  const [lastKeysTab, setLastKeysTab] = useState([""]);
  const [inputHandler, setInputHandler] = useState(null);
  let handler;
  let game = null;
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const playerRef = useRef();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    handler = new HandleInput(keysTab, lastKeysTab, isPlayed);
    setInputHandler(handler);

    if (!isPlayed) {
      handler.initializeWheelListener();
    } else {
      handler.initializeKeyListener();
    }
    if (contact || isOpenProject) {
      handler.removeListeners();
    }
    return () => {
      if (handler) {
        handler.removeListeners();
      }
    };
  }, [isPlayed, RoomLevel, nextLevel, isMenu, contact, isOpenProject]);

  useEffect(() => {
    if (nextLevel || goToHome) {
      playerRef.current.testActivate();

      if (nextLevel) {
        handleNextLevel();
        setTimeout(() => {
          changeRoom();
        }, 1500);
      }
      if (goToHome) {
        playerRef.current.pausingStarship();
        handleGoToHome();

        setTimeout(() => {
          changeRoomOne();
        }, 1500);
        setTimeout(() => {
          setReload((prev) => !prev);
        }, 2000);
      }
    }
  }, [nextLevel, goToHome]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvas(canvas);
    setCtx(ctx);
  }, []);

  useEffect(() => {
    if (canvas && ctx) {
      let animation;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      game = new Game({
        canvas,
        keysTab,
        lastKeysTab,
        toExp,
        RoomLevel,
        changeRoom,
        handleIsDialog,
        activeCatSecret,
        activeRobotSecret,
        testRef,
        eatingMushroomEffect,
        handleContact,
        addFoundSecrets,
      });
      game.initialize();
      const {
        player,
        camera,
        background,
        water,
        cloud,
        currentCollisionLevel,
        overlay,
        starShip,
        secrets,
      } = game.getAnimateObjects();
      playerRef.current = player;

      window.scrollBy(0, -100);

      let deltaTime = 1; //deltaTime multiplier

      let msPrev = performance.now();
      const fps = 60;
      const msPerFrame = 1000 / fps;
      let frames = 0;

      function animate() {
        animation = requestAnimationFrame(animate);

        const msNow = performance.now();
        const msPassed = msNow - msPrev;

        if (msPassed < msPerFrame) return;

        const excessTime = msPassed % msPerFrame;
        msPrev = msNow - excessTime;
        frames++;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(camera.position.x, camera.position.y);

        background.draw(ctx, canvas);
        currentCollisionLevel.forEach((collisionBlock) => {
          collisionBlock.draw(ctx);
        });
        if (RoomLevel === 2) {
          starShip.draw(ctx, player);
        }

        if (RoomLevel === 1) {
          secrets.forEach((secret) => {
            secret.draw(ctx);
            secret.update();
          });
        }
        player.draw(ctx);
        player.updatePlayer({
          background,
          context: ctx,
          canvas,
          camera,
          deltaTime,
        });
        if (RoomLevel === 1) {
          water.draw(ctx, canvas);
          cloud.draw(ctx);
          // cloud.update();
        }

        ctx.restore();

        ctx.save();

        ctx.globalAlpha = overlay.opacity;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      background.onload = animate(0);
      setBackgroundHeight(background.height);
      return () => {
        cancelAnimationFrame(animation);
        playerRef.current = null;
      };
    }
  }, [canvas, ctx, RoomLevel, reload]);

  return <canvas ref={canvasRef} />;
}
