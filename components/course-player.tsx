import { FC, useEffect, useRef, useState } from "react";

interface Props {
  videoUrl: string;
  title: string;
  // onVideoEnd: () => void;
}

// declare global {
//   interface Window {
//     onYouTubeIframeAPIReady: () => void;
//     YT: any;
//   }
// }

const CoursePlayer: FC<Props> = ({ videoUrl, title }): JSX.Element => {
  // const [player, setPlayer] = useState<any>(null);
  // const ref = useRef<HTMLIFrameElement>(null);

  // useEffect(() => {
  //   const tag = document.createElement('script');
  //   tag.src = "https://www.youtube.com/iframe_api";
  //   const firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

  //   window.onYouTubeIframeAPIReady = () => {
  //     if (ref.current) {
  //       const newPlayer = new window.YT.Player(ref.current, {
  //         events: {
  //           'onStateChange': (event: any) => {
  //             if (event.data === window.YT.PlayerState.ENDED) {
  //               onVideoEnd();
  //             }
  //           }
  //         }
  //       });
  //       setPlayer(newPlayer);
  //     }
  //   };

  //   return () => {
  //     if (player && player.destroy) {
  //       player.destroy();
  //     }
  //   };
  // }, [videoUrl, onVideoEnd, player]);

  return (
    <div className="w-full mx-auto aspect-video border-b">
      <iframe
        // ref={ref}
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoUrl}?enablejsapi=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CoursePlayer;
