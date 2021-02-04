import { useEffect } from "react";
import useSound from "use-sound";
import beep from "../beep.mp3";

export default function Sound() {
  const [play] = useSound(beep, { interrupt: true });

  useEffect(() => {
    play();
  }, [play]);
  return null;
}
