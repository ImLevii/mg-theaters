import { useLocalStorage } from "@mantine/hooks";

export const useAutoPlay = () => {
  const [autoPlay, setAutoPlay] = useLocalStorage({
    key: "vadedtv-autoplay",
    defaultValue: true,
  });

  const toggleAutoPlay = () => setAutoPlay((prev) => !prev);

  return { autoPlay, setAutoPlay, toggleAutoPlay };
};

export default useAutoPlay;
