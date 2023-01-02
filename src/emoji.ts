/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import type * as MarkdownIt from 'markdown-it';
import type { RendererContext } from 'vscode-notebook-renderer';
import * as frontMatterPlugin from "markdown-it-front-matter";
import footnotePlugin from "markdown-it-footnote";
import docutilsPlugin from "markdown-it-docutils";
import dollarmathPlugin from "markdown-it-dollarmath";
import amsmathPlugin from "markdown-it-amsmath";
import { renderToString } from "katex";
import { convertFrontMatter, mystBlockPlugin } from "./mdPlugins";
interface MarkdownItRenderer {
  extendMarkdownIt(fn: (md: MarkdownIt) => void): void;
}

export async function activate(ctx: RendererContext<void>) {
  const markdownItRenderer = await ctx.getRenderer('vscode.markdown-it-renderer') as MarkdownItRenderer | undefined;
  if (!markdownItRenderer) {
    throw new Error(`Could not load 'vscode.markdown-it-renderer'`);
  }

  const emoji = require('markdown-it-emoji');
  markdownItRenderer.extendMarkdownIt((md: MarkdownIt) => {
    // add in the MyST Stuff
    const newMd = md
      .use(emoji)
      .enable("table")
      .use(frontMatterPlugin)
      .use(convertFrontMatter)
      .use(mystBlockPlugin)
      .use(footnotePlugin)
      .disable("footnote_inline") // not yet implemented in myst-parser
      .use(docutilsPlugin)
      .use(dollarmathPlugin, {
        double_inline: true,
        renderer: renderToString,
        optionsInline: { throwOnError: false, displayMode: false },
        optionsBlock: { throwOnError: false, displayMode: true }
      })
      .use(amsmathPlugin, {
        renderer: renderToString,
        options: { throwOnError: false, displayMode: true }
      })
    // TODO substitutions
    return newMd;
  });
}