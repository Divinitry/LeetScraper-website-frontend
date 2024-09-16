import React from 'react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b bg-black" style={{ borderColor: 'hsl(0, 0%, 14.9%)' }}>
            <div className="container mx-auto flex flex-col lg:flex-row lg:items-center px-4 py-7 relative">
                <div className="flex items-center justify-start w-full lg:w-auto">
                    <a href="/" className="flex items-center whitespace-nowrap text-2xl font-black text-white">
                        <span className="mr-2 w-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 500 500"
                                preserveAspectRatio="xMidYMid meet"
                                className="h-10 rounded-sm"
                            >
                                <rect width="500" height="500" fill="white" />
                                <g
                                    transform="translate(0,500) scale(0.1,-0.1)"
                                    fill="black"
                                    stroke="none"
                                >
                                    <path d="M0 2500 l0 -2500 2500 0 2500 0 0 2500 0 2500 -2500 0 -2500 0 0 -2500z m843 1993 c29 -21 53 -52 77 -98 l35 -68 3 -1526 2 -1526 -224 -224 c-205 -204 -225 -222 -231 -200 -3 13 -4 798 -3 1744 l3 1720 28 60 c16 33 40 73 55 89 68 73 176 85 255 29z m3439 17 c89 -27 140 -67 171 -132 47 -100 49 -127 45 -703 -4 -607 -2 -591 -80 -680 -52 -59 -84 -75 -150 -75 -68 0 -113 24 -159 85 -69 89 -69 92 -69 626 l0 479 -459 0 c-434 0 -462 1 -525 21 -119 36 -192 134 -167 224 20 75 75 122 179 156 52 16 104 18 603 18 519 1 550 0 611 -19z m-1202 -985 c0 -59 -32 -154 -74 -219 -45 -69 -106 -122 -185 -160 -64 -30 -71 -31 -246 -37 -100 -3 -189 -10 -200 -16 -126 -69 -117 -253 16 -300 l49 -18 -172 -172 c-95 -95 -178 -173 -184 -173 -7 0 -43 31 -81 69 -114 115 -171 242 -180 407 -11 197 45 344 181 479 91 91 167 136 278 165 65 17 112 19 436 19 l362 1 0 -45z m-121 -871 c106 -80 191 -208 226 -339 19 -75 19 -231 0 -314 -47 -199 -212 -375 -415 -443 -62 -21 -85 -22 -472 -26 l-408 -3 0 46 c0 25 9 74 21 108 41 125 121 215 237 270 67 32 67 32 272 37 192 5 207 7 242 28 41 25 78 91 78 138 -1 48 -34 109 -74 133 -20 13 -60 25 -92 28 l-55 6 183 187 c101 103 186 188 190 188 3 1 33 -19 67 -44z m1365 -1639 c68 -28 141 -95 162 -150 40 -107 -27 -217 -166 -272 -42 -17 -141 -18 -1730 -21 -927 -2 -1709 0 -1739 3 l-54 7 229 229 229 229 1510 -2 c1484 -3 1511 -3 1559 -23z"/>
                                </g>
                            </svg>
                        </span>
                    </a>
                </div>
                <input type="checkbox" className="peer hidden" id="navbar-open" />
                <label className="absolute top-8 right-8 cursor-pointer lg:hidden" htmlFor="navbar-open">
                    <svg className="h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
                <nav aria-label="Header Navigation" className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:max-h-full lg:flex-row lg:flex-1 lg:justify-center relative">
                    <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
                        <li className="lg:mr-12"><a className="rounded transition focus:outline-none font-thin text-2xl hover:text-opacity-50" href="/">Home</a></li>
                        <li className="lg:mr-12"><a className="rounded transition focus:outline-none font-thin text-2xl hover:text-opacity-50" href="/todolist">Code</a></li>
                        <li className="lg:mr-12"><a className="rounded transition focus:outline-none font-thin text-2xl hover:text-opacity-50" href="/search">Search</a></li>
                    </ul>
                    <div className="absolute right-0 top-0 my-4 flex items-center lg:my-0 lg:ml-auto space-x-4">
                        <a href="/login" className="whitespace-nowrap rounded transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 hover:text-opacity-50 font-thin text-2xl"> Log in </a>
                        <a href="/logout" className="whitespace-nowrap rounded transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 hover:text-opacity-50 font-thin text-2xl"> Log out </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;
