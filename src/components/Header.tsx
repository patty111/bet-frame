import React from 'react';

export default function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Bet 
        <span className="text-zinc-300 inline-block mx-1">  +  </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Frame </span>
      </h1>
      <p className="text-zinc-300 text-base"></p>
    </header>
  );
}