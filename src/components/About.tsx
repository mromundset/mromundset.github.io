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
    image: '/images/resturant_pic_marcus.JPG',
    description: "Norwegian at heart, but love trying new foods from around the world. California is the perfect place to explore new cuisines and cultures!",
    ascii: meAscii,
    caption: "[ San Diego, 2025 ]"
  },
  { 
    id: 'golf', 
    label: 'Golf [1]', 
    image: '/images/golf.JPG',
    description: "Currently playing on the Cal Club Golf Team. Golf is the perfect way to disconnect from the busy day-to-day life and focus on whats impportant: reducing my handicap!",
    ascii: golfingAscii,
    caption: "[ Berkeley Country Club, 2024 ]"
  },
  {
    id: 'golf_2',
    label: 'Golf [2]',
    image: '/images/golf_2.JPG',
    description: "Capturing moments and perspectives. I love the technical and artistic blend of photography.",
    ascii: golf_2_ascii,
    caption: "[ Poppy Hills, 2024 ]"
  },
  { 
    id: 'hiking', 
    label: 'Hiking', 
    image: '/images/mountain.JPG',
    description: "Norwegian mountains are some of the most beautiful in the world. I love to hike and explore the trails, and the feeling of being in the middle of nowhere is truly special.",
    ascii: mountainAscii,
    caption: "[ Norway, 2024 ]"
  },
];

const secondaryTabs: Tab[] = [
  { 
    id: 'professional', 
    label: 'Me [professional]', 
    image: '/images/professional_headshot.jpg',
    description: "Exploring from fjords to Californian trails. I'm always looking for the next great view and cultural experience.",
    ascii: professionalAscii,
    caption: "[ Berkeley, 2025 ]"
  },
  { 
    id: 'skiing', 
    label: 'X-Country Skiing', 
    image: '/images/skiing.JPG',
    description: "Clearing my mind on the trails. Running is my meditation and a way to explore new cities.",
    ascii: skiingAscii,
    caption: "[ Norway, 2023 ]"
  },
  { 
    id: 'soccer', 
    label: 'Soccer / Football', 
    image: '/images/liverpool.jpg',
    description: "Curious about everything from economics to philosophy. Currently reading 'The Black Swan' by Nassim Taleb.",
    ascii: liverpoolascii,
    caption: "[ Liverpool, 2023 ]"
  },
  { 
    id: 'frenchie', 
    label: 'French Bulldog', 
    image: '/images/fransesco.JPG',
    description: "Finding rhythm in code and life. I enjoy discovering new genres and attending live concerts.",
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
            href="\public\M_Romundset_Resume_2026.pdf"
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
            className="aspect-[3/4] w-3/4 ml-auto rounded-md overflow-hidden relative bg-gray-100 dark:bg-gray-900"
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
          <p className="font-mono text-sm text-gray-500 dark:text-gray-400 mt-3 text-right w-3/4 ml-auto tracking-wide">
            {currentTab.caption}
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
