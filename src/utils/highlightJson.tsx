import type { ReactNode } from 'react';

export function highlightJson(raw: string): ReactNode[] {
  const tokenPattern =
    /("(?:\\.|[^"\\])*"\s*:)|("(?:\\.|[^"\\])*")|(true|false|null)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\]:,])/g;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(raw.slice(lastIndex, match.index));
    }

    const [fullMatch, key, str, bool, num, punct] = match;

    if (key) {
      const colonIndex = key.lastIndexOf(':');
      nodes.push(
        <span key={`k${match.index}`} className="text-accent">
          {key.slice(0, colonIndex)}
        </span>,
        ':',
      );
    } else if (str) {
      nodes.push(
        <span key={`s${match.index}`} className="text-cyan-200">
          {str}
        </span>,
      );
    } else if (bool) {
      nodes.push(
        <span key={`b${match.index}`} className="text-emerald-400">
          {bool}
        </span>,
      );
    } else if (num) {
      nodes.push(
        <span key={`n${match.index}`} className="text-emerald-400">
          {num}
        </span>,
      );
    } else if (punct) {
      nodes.push(
        <span key={`p${match.index}`} className="text-slate-500">
          {punct}
        </span>,
      );
    } else {
      nodes.push(fullMatch);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < raw.length) {
    nodes.push(raw.slice(lastIndex));
  }

  return nodes;
}
