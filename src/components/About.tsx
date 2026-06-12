import React, { useState, useEffect } from 'react';
import ScramblePortrait from './ScramblePortrait';

interface Tab {
  id: string;
  label: string;
  image: string; // Path to image in public/ (e.g. "/images/me.jpg")
  description: string;
  ascii: string; // Custom ASCII art for this tab
  caption: string;
}

const meAscii = 
`

                            .
                     :=+=--====--:.
                   .+##****#%%#**++-:.
                  :##*+#@@@@@@@#*#%%*+-.
                 .*##%*#@@%%%%#**%@@@@%*-
                 :#@@@*++*#+---=+*#%@@@@%-
                .#@@#+==--=--:::::--+#%@@*
                +@%#++==:::::::::----++@@*
                +@##++=-:. ....-=-====*@@@+
                :@@%#*+==-:..::-==---=%@@@@.
                .%@%#++=+-==:--:----:=#@%@=
                 +@@%+=---==::-:::.::-+=--
                 .#%#+-::-=-::::....:-+::.
                  .-+*-::---:::::::::=+*-.
                   .-*+--==-:...:=-::-+@*
                     :+-:=+-:..:--::-=*@-
                      :#+-==-::::::-=++*.
                       *##+-:...:-=++=-#%+....
                 .:--+##+*#*+=======-:-+@@@%@@#:.
               -=#@@@@@%=-==+==--:--:::=%@@@@@@@@%*+=-..
           :++#@@@@@@@@@+-::--:..:::::-=*@@@@@@@@@@@@@@%*+:
       -**#@@@@@@@@@@@@@%-::::----::::--*@@@@@@@@@@@@@@@@@%=
     .+@@@@@@@@@@@@@@@@@@#-::::---:::-::*@@@@@@@@@@@@@@@@@@@
    :#@@@@@@@@@@@@@@@@@@@@#-::::--:::::#%@@@@@@@@@@@@@@@@@@@
   :@@@@@@@@@@@@@@@@@@@@@@@@#=:::.::.:#@@@@@@@@@@@@@@@@@@@@@
  .#@@@@@@@@@@@@@@@@@@@@@@@@@@%=::..-#@@@@@@@@@@@@@@@@@@@@@@
 .#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#-.+@@@@@@@@@@@@@@@@@@@@@@@@
 .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@@@@@@@@@@@@@@@@@@@@@@
 :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
=%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+-#@@@@
**#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+  -#@@
--::-=*#@@@@=.%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=   .=#
---::::-=*%=  %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+
----======.   #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*
==+++***=     *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*
+=-=++**+=:.  +@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-
*=:-+*#%%%#+=-+@@@@@@@@@@@@@@@@@@%%%%%@@@@@@@@@@@@@@@#-.   .
*+-=*#%%%%#=++*#@@@@@@@@@@@@#%@@@@@@@@@@@@%**##**@@@@@@%- -#
`;

const golfingAscii = 
`













                        ..:-
                       .=+*-..
                     .-*%*+++=-
                     .%@##*#%*-
                      -=*%@%@#=
                        .=%@@%#-.
                          +@%%#%+
                          .#%@%%-
                           +@@@@=                   ......
                          :%@@@@#.              .. ....:++.
                          -@@@@@@:            .:=:......:.
                          .%@@@@@:           .+=+.:-+=-:..
                          :@@@@@%.           =*.#=-++:..
                         .*@@*%@#          ::+*+#=@*-
                        .*@@*.#@%.       :*=*%@@@*@%:.
                       .*@@+  *@@.      .#@##%@@%:#@::
                      .+@@=   *@@.      :%@@@@@@#.=@-:.
                     :#@@=    -@%.       +@@@@@*.......
                     .#%-     -**.        ::::.  .
                     .-.      :-:











`;

const mountainAscii = 
`









                         .
                        =***:
                      .+%%%%#*+=:
                    :=%@%%%%##%%##+.
                   :@@@%%@%##%%%@@@%*:
                  -@@%#%%%#%####%%@@@#:
                 :%@###%##%%%%@@@@@@@@@=
                :#@@%%#%##%%%@@@@@@@@@@@=
+:              .%@@@@%%%#%%@@@@@@@@@@@@@:
##+-.         .*#@@@%@#%%@@@@@%%@@@@@%%@@@+
####+-=*++-   =@@@%%@%@@@@@%@@%%@@@@@%%%@@@=
%#**#%%%%%@*::*%%%%%%@@@@@@@%%%%%@@@@@@%%%@@=.
**###%%###%@%%##%#*#@@@@%*#*****##%%@@%##%@@@+
###%%%###*#@@@%####%%%#**+++++*#%###%%%%@%%@@%:
#####*###%%%%######*+++***+++*##%%%%%**%%##%@@%.
####*###%##*##******+***#*++*%%%%##%@%######%@@=
#####******##**++++****#%%##@@@@%%@@@%#%%%%%%%@%+
#*******###****+++***#%@@@@%#%%@%%@@%##%%%%%@@%@@*.
+**######***##%#*+*++##@@@%%#%%#*######%%##@@@@%@@-
*#######*+*@@@@@@@@%**%@@@%@@%%%%##%%%%%###%@@@%%@*
###*#****%@@@@@@@%##%@@@@@@%@%@@@@%@%%%%#####%@%%@@-
#%#******%%@@@@@%###@@@@@@@%%%%%@@@@%@@%%%###**#%@@*
#**+++*#####****##%%%#%%#%#*##%%%%@@%@%%%%%%####%%@@##+
+=**++++*++*+*+++***+**###******##%@@@@##%%%%@@%#%@@@@@+:.
++++***+++++====++**+****##%%##****#%%%%%%%@@%%%#+*%%%@@@=
##*#*****+++==****###***##%%%@%%@%%@@%###%%#*++**####*#@@@-
*******++*******#########%#%%%%%@@@@@%##%@%#****#@##%@@%@@@*
**++****#######%%#%###%%%%%@@%@%#%@@@#%@@@@@%%%@@#*#%#%##@@@
++++*########%%##%%%%%%%%%%%%%@%##%%%@@@@@@@%%@@%%%%%%%#%%@@
+++*#######**######%%%%%@%%%###%%%%#%%@@@@%%%#%%%@@@%@@@##*#
**#######**#**###%%%%%%%%%%#%%%###%#%#%#%@@%%%%%%%@@@@@@##**
*#######*=+****##%%%#%%%########%%%%%%%%%@@%%%#%%%@%@@%%%@@@
##%#####***#########%%#%%##########%%%%%%%#%%%%%%%@@@@@@@@@%
%%#####**##*##%######%#######%%####%%%#%####%%%@@@@@@@@@@@@@
%#####***###%###%%#%%%%%#%##%%%##########%%%##%%@@@@@@@@@@@%
`;


const skiingAscii = 
`









                           .-+-
                          .+#%%-
                          -%#%@#
                          :#%%%#
                          .*@%@*
                       .=*%@@@@@#=:
                    .:.%@@@@@@@@@@@=
                   .-#%@@@@@@@@@@@@%.
                   -@@@@@@@@@@@@@@@@*-
                   :%@@@@@@@@@@@@@@@@@=
                    -%@@@@@@@@@@@@@@@%:
                    -.:.*@@@@@@@@+=*+-
                   .=   #@@@@@@@@+   -.
                   :-  .@@@@@@@@@=   ::
                   =.  .@@@@@@@@@=   .=
                  .=   :@@@@@@@@@+    -.
                  :-   -@@@%:%@@@+    .-
                  -.   =@@@- =@@@-     -.
                  =.   =@@#  .@@@:     ::
                 .-    *@@-   +@@-     .-
                 -:   .%@%.   -@@=      -.
                 =.   :@@+.:..:@@=      .-
                .-    .%@=-..-:@@:       -.
                ::    .%@+.  .=@@:       ::
                -.   .*@%.    .*@#.      .-
               .-    .@%:      .#@-       :.
               ::    -%:        .##       .:
               :.   :*:          .#+
              .:   :+:            .#*
              ..  :*:              .+=.
                 :*:                .+=
                :+:                  .=+.
               :+:                    .+*.
              :#:                       ++.
             :#:                         ++.
`;

const frenchieAscii = 

`











                                     :.
                         ...         %#.
                        -%@%-       =@@#.
                       =@@@@#=-::-=+%%@@+
                     .+@@@@@@@@@@@@@@*#@%.
                   .-#@@@@@@@@@@@@@@@#+%@*.
                 .=*%@@@@@@@@@@@@@@@@@##@@=
              .-+%@#%@@@@@@@@@%%@@@@@@@@@@%.
           .-=#@@%%%@@@@@@@@@#**##%%@@@@@@@=
           -%@@@%@%@@@@@@@@@@@@@@%%@@@@@@@@*
           =@@@%@@%@@@@@@@@@@@@@@@%%@%@@@@@%.
            -=*%%%%@@@@@@@@%@@@@@@@@@@@@@@@#.
               .=*@@@@@@@@@@@@@@@@@@@@@@@@@-
              :*#%@@@@@@@@@@@@@@@@@@@@@@@@@-
             -@@@@@@@@@@@@@@@@@@@@@%%%@@@@@=
            .%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+
            =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
            +@@@%@@@@@@@@@@@@@@@%%%@@@@@@@@@:
            *@@@@@#--++**##*+-:...:-*@@@@@@@=
           .%@@@@#.                  #@@@@@@:
          -%@@@@#.                   :@@@@@%.
       .=#@@@@@@:                     =@@@@@:
     .=%@@@@@@@=                      .#@@@@*
     .%@@@@@@@+                        +@@@@@*
      .+##*-:.                         :@@@@@@*.
                                       .%@#@@@@#.
                                        :+#@@@%%:
                                          .=++=-.





`;

const professionalAscii = 

`






                           ..  ..
                        .-=++*+++=-:.
                      .-+***#@@#****+-.
                     .*%####*******#%%*.
                     +@@%*+:...:-+*#@@@+
                    .#%%*:..    ..-=#%@#
                    :%@@+-=++-::+*+=+@@@:
                    :@%@--+**=.:++=--##@:
                    .=++-..:::::::..:==-
                     :-:=-==-=+=--+=--:.
                     .+%+==+*=--=*===%*
                      :%#++--===-:-++#:
                       -+=*+==---=+=-.
                        .:=+*****+=-:.
                      :*: .:---::-:.. =:
                  .-=#@@*.   .:=-.   .*%*=:.
              .-*%@@@@@@@+.  -#%#*.  .+@@@@%*=:
         .+###%@@@@@@@@@@@-.:-+%%=:   +@@@@@@@%#*+=:.
         =@@@@@@@@@@@@@@@@*...=%%-    *@@@@@@@@@@@@@-
         #@@@@@@@@@@@@@@@@@= -%%%#:  .%@@@@@@@@@@@@@#
        :%@@@@@@@@@@@@@@@@@@:+%##%+  -@@@@@@@@@@@@@@@-
       .#@@@@@@@@@@@@@@@@@@@*+#####. +@@@@@@@@@@@@@@@%.
       =@@@@@@@@@@@@@@@@@@@@@*#####:.%@@@@@@@@@@@@@@@@=
       #@@@@@@@@@@@@@@@@@@@@@@####%:-@@@@@@@@@@@@@@@@@%.
      :@@@@@@@@@@@@@@@@@@@@@@@%###%-*@@@@@@@@@@@@@@@@@@:
      +@@@@@@@@@@@@@@@@@@@@@@@@###%+%@@@@@@@@@@@@@@@@@@:
      #@@@@@@@@@@@@@@@@@@@@@@@@%##%@@@@@@@@@@@@@@@@@@@@=
      %@@@@@@@@@@@@@@@@@@@@@@@@@##@@@@@@@@@@@@@@@@@@@@@*
     .%@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@@@@@@@@@@@@@@@@@@#
     -@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*
     +@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+
     *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@+
     #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*
     #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
     =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
     .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%.
     -@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%.
     -@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%.
`;

const liverpoolascii = 

`
     














             :*+-           .-=-:             .==.
            .%@%%=          =#++#-           .###%*.
            :*++*=          =#**#=           :*++**.
          ...=+++: .      :=+%#%#=:.        .##++#*.
        .:--:-++=::-.   .:-=+*##+=-::.    .*%@%#*@@#+:
       .:--=--=-=-:::.  ----==++--==-:   :%@@@@@@@@@@%+.
      .::-=-+-*==+::::: -:==-===:-+=::  -%@@@#***##%@@%=
     ::::****=**=*-=-:-+--+%**++*#%+-- =@@@@**###*+#@@@%.
.....:::::-==--=-:.::-:#-::=====++-::=-*@%%%#+==-=*%@@@@:
*****************+++++++++++++++++====+=++*##+=+++=+###*=---
%%%%%%%%%%%%%%%%%%%%%%%##################################%%%
%%%%%%%%%%%%%%%####################################%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%###################%%%%%%%%%%%%%%%%%%
+++*******++*******+++++++++***##**************#############
::::::::::::::::::::::::::=+++++++++++-:::---------------===
:::::::::::::::::::::::::+#*+++**+++**+:::::::::::::::::::::
::::::::::::::::::::::::::*#++*##*++#*::::::::::::::::::::::
----::::::::::::::::::::::*###******%+::::::::::::::::::::--
----------:::::::::::::::=*+-----===*+=::::::::::-----------
-------------:::::::::::=#++::-***--***:::::::::------------
----------------::::::::-*-+=:=%#-:*-++:::::::--------------
--------------::::::::::-#%%#=-+=-*%%%=:::::::::------------
:::::::::::::::::::::::::===##****%+==-::::::::::::::::::::-
=========================--=+++++++=------------------------
####################################******##################
+++++++++++++++++++++++=--::::::::::::::::::::-=++++******##
                                                          ..


`;

const golf_2_ascii = 

`































                                                 =+
                                                 %@= 
                                                 #@% 
                 ::---===+++==-::::..:::.::-==+++%@@:
:::::-===+++***%##########%%%%%%%%######*############*******
%%%%%%%@%%%###@@@#****************##########################
%%@@@@%%%%%%%%%@@###########################################
%%%%%%%%%%%%%%@@%###################%##%####################
@@@@@@@@@@%%%%@@@@@%%%################%%%%%%%%%%%%%##%######
@@@@@@@@@@@%%%%@@@@@@@@@%%%#############%##%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%@@@@@%%%@@@%%%%###############%%%%%#%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#%###############%%%%
@@@@@%%%%%%%%%%%%%%%%%%%%@@@@@@@@@@@@%%%%%%%%%%%%%%%%%%%%%%%
`;

const defaultAscii = `
      .---.
     /     \\
    |  O_O  |
    |   ^   |
     \\  -  /
      '---'
      _| |_
     | | | |
     |_|_|_|
`;

const primaryTabs: Tab[] = [
  { 
    id: 'me', 
    label: 'Me [casual]', 
    image: '/images/resturant_pic_marcus.jpg',
    description: "I love exploring culture and food from all corners of the world. The image to the right is from a Japanese resturant in Southern California. My favorite cousine is Korean Food!",
    ascii: meAscii,
    caption: "[ San Diego, 2025 ]"
  },
  { 
    id: 'golf', 
    label: 'Golf [1]', 
    image: '/images/golf.jpg',
    description: "Golf is one of the hobbies I enjoy the most. I started playing golf alongside my dad in High School, and haven't stopped since.",
    ascii: golfingAscii,
    caption: "[ Berkeley Country Club, 2024 ]"
  },
  {
    id: 'golf_2',
    label: 'Golf [2]',
    image: '/images/golf_2.jpg',
    description: "I currently play on the Cal Club Golf Team, which is the competitive club team at UC Berkeley. One of my favorite memories is playing Poppy Hills, a true gem in Monterey Bay, California.",
    ascii: golf_2_ascii,
    caption: "[ Poppy Hills, 2024 ]"
  },
  { 
    id: 'hiking', 
    label: 'Hiking', 
    image: '/images/mountain.jpg',
    description: "Norwegian mountains are some of the most beautiful in the world. I love to hike and explore new peaks, parfticularily those close to my hometown of Bodø, Norway. My current bucketlist mountain is Mt. Whitney, California's tallest peak.",
    ascii: mountainAscii,
    caption: "[ Norway, 2024 ]"
  },
];

const secondaryTabs: Tab[] = [
  { 
    id: 'professional', 
    label: 'Me [professional]', 
    image: '/images/professional_headshot.jpg',
    description: "When I am not playing golf, I am usually working on my professional skills. I have been the President of a tech-consulting organization at UC Berkeley for a major portion of my college life, and love the community that comes with it.",
    ascii: professionalAscii,
    caption: "[ Berkeley, 2025 ]"
  },
  { 
    id: 'skiing', 
    label: 'X-Country Skiing', 
    image: '/images/skiing.jpg',
    description: "Norwegians are said to be 'born with skis on their feet'. I have been cross-country skiing for as long as I can remember, and still love the feeling of racing up and down the hills.",
    ascii: skiingAscii,
    caption: "[ Norway, 2023 ]"
  },
  { 
    id: 'soccer', 
    label: 'Soccer / Football', 
    image: '/images/liverpool.jpg',
    description: "Soccer is a sport I have played throughout my entire childhood. My position was always goalie, and I still pay close attention to the professional leagues. My favorite team is Liverpool FC.",
    ascii: liverpoolascii,
    caption: "[ Liverpool, 2023 ]"
  },
  { 
    id: 'frenchie', 
    label: 'French Bulldog', 
    image: '/images/fransesco.jpg',
    description: "My Frenchie converted me to a dog person. Whenever I visit home, I make sure to take him for as many walks as possible!",
    ascii: frenchieAscii,
    caption: "[ Fransesco (my frenchie), 2024 ]"
  },
];

const allTabs = [...primaryTabs, ...secondaryTabs];

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [targetText, setTargetText] = useState(text);

  useEffect(() => {
    if (text !== targetText) {
      setIsDeleting(true);
    }
  }, [text, targetText]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, 10); // Fast delete
      } else {
        setIsDeleting(false);
        setTargetText(text);
      }
    } else {
      if (displayedText.length < targetText.length) {
        timer = setTimeout(() => {
          setDisplayedText(prev => targetText.slice(0, prev.length + 1));
        }, 20); // Typing speed
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, targetText, text]);

  return (
    <p className="text-lg font-medium text-gray-400 min-h-[3em] leading-relaxed transition-colors duration-300">
      {displayedText}
      <span className="animate-pulse text-gray-400">|</span>
    </p>
  );
};

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('me');
  const [isHovering, setIsHovering] = useState(false);

  const currentTab = allTabs.find(t => t.id === activeTab) || allTabs[0];

  // Reset hover state when tab changes to ensure ASCII shows first
  useEffect(() => {
    setIsHovering(false);
  }, [activeTab]);

  const TabButton = ({ tab }: { tab: Tab }) => (
    <button
      onClick={() => setActiveTab(tab.id)}
      className={`text-left transition-colors duration-0 text-lg py-2 font-mono ${
        activeTab === tab.id
          ? 'font-bold text-black dark:text-white border-b-2 border-black dark:border-white inline-block w-fit'
          : 'font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border-b-2 border-transparent'
      }`}
    >
      {tab.label}
    </button>
  );

  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-8">
      
      {/* Section Header */}
      <h2 className="text-xl font-bold mb-12 text-left text-gray-900 dark:text-white">
        [ TL;DR ]
      </h2>

      {/* Top Section: The Narrative */}
      <div className="w-full max-w-4xl mb-24">
        <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 font-light">
          Norwegian Computer Science &amp; Economics undergraduate student at{' '}
          <a
            href="https://www.berkeley.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline !bg-none"
          >
            UC Berkeley
          </a>
          . <br /> Check out my{' '}
          <a
            href="\M_Romundset_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline !bg-none"
          >
            Resume
          </a>
          ,{' '}
          <a
            href="https://www.linkedin.com/in/romundset/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline !bg-none"
          >
            LinkedIn
          </a>
          ,{' '}
          <a
            href="https://github.com/mromundset"
            target="_blank"
            rel="noopener noreferrer"
            className="underline !bg-none"
          >
            GitHub
          </a>
          , or reach me at{' '}
          <a
            href="mromundset@berkeley.edu"
            className="underline !bg-none"
          >
            mromundset@berkeley.edu
          </a>
          !
        </p>
      </div>

      {/* Bottom Section: Console & Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-24">
        
        {/* Combined Controls Column - Spans 6 columns now to match the 2 previous 3-col divs */}
        <div className="md:col-span-6 flex flex-col space-y-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            [ Interests ]
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              {primaryTabs.map((tab) => (
                <TabButton key={tab.id} tab={tab} />
              ))}
            </div>
            <div className="flex flex-col space-y-4">
              {secondaryTabs.map((tab) => (
                <TabButton key={tab.id} tab={tab} />
              ))}
            </div>
          </div>
          
          <div className="pt-8 max-w-md">
            <TypewriterText text={currentTab.description} />
          </div>
        </div>

        {/* Column 3: The Viewport */}
        <div className="md:col-span-6 relative w-full h-full flex flex-col justify-end">
          <div
            className="aspect-[3/4] w-3/4 ml-auto max-md:mx-auto rounded-md overflow-hidden relative bg-gray-100 dark:bg-gray-900"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Layer 1: The Real Image */}
            <img 
              src={currentTab.image} 
              alt={currentTab.label}
              className={`w-full h-full object-cover absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Layer 2: The ASCII Overlay */}
            <div 
              className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ease-in-out ${
                isHovering ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <ScramblePortrait targetAscii={currentTab.ascii} active={!isHovering} />
            </div>
          </div>

          {/* NEW CAPTION */}
          <p className="font-mono text-sm text-gray-500 dark:text-gray-400 mt-3 text-right w-3/4 ml-auto max-md:mx-auto tracking-wide">
            {currentTab.caption}
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
