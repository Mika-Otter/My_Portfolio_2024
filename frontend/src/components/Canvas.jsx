import { useRef, useEffect, useState } from "react";
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
}) {
  const canvasRef = useRef(null);
  const backgroundHeight = useBackgroundHeight();
  const setBackgroundHeight = useSetBackgroundHeight();
  const [keysTab, setKeysTab] = useState([]);
  const [lastKeysTab, setLastKeysTab] = useState([""]);
  const [inputHandler, setInputHandler] = useState(null);
  let handler;
  const [firstGame, setFirstGame] = useState(true);
  const [player, setPlayer] = useState(null);
  const [changingLevel, setChangingLevel] = useState(false);
  const ctxRef = useRef(null);
  let game = null;
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const playerRef = useRef();
  const [reload, setReload] = useState(false);
  const [deltaTimeValue, setDeltaTimeValue] = useState(0);
  const [loadingEnd, setLoadingEnd] = useState(false);

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
    let lastTime = 0;
    let animationId = null;

    function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      animationId = requestAnimationFrame(animate);
      setTimeout(() => {
        setDeltaTimeValue(deltaTime);
      }, 3300);
    }

    animate();

    // Stop the animation after 1 second
    const timeoutId = setTimeout(() => {
        if (animationId) {
          cancelAnimationFrame(animationId);
  
          // Start the timeout to set loadingEnd to true when the animation ends
          setTimeout(() => {
            setLoadingEnd(true);
          }, 3300);
        }
      }, 1000);



    // Clean up on unmount
    return () => {
      clearTimeout(timeoutId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  useEffect(() => {
    // console.log("result", deltaTimeValue, loadingEnd);
  }, [deltaTimeValue, loadingEnd]);

  useEffect(() => {
    if (canvas && ctx && loadingEnd) {
      console.log("result", deltaTimeValue);
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
        deltaTime: deltaTimeValue
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
      function animate(timeStamp) {


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
        animation = requestAnimationFrame(animate);
      }

      background.onload = animate(0);
      setBackgroundHeight(background.height);
      return () => {
        cancelAnimationFrame(animation);
        playerRef.current = null;
      };
    }
  }, [canvas, ctx, RoomLevel, reload, loadingEnd]);

  return <canvas ref={canvasRef} />;
}
