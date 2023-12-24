import type { TreeSitterParser } from "./treeSitterParser";
import { createTreeSitterParser, Target } from "./treeSitterParser";
import { pattern } from "./define";
import { parsePattern } from "./pattern";
import type {
  PatternDraft,
  PatternNode,
  TemplateArg,
  TemplateBlock,
  TemplateContextVariable,
  TemplateParam,
} from "./types";

export default class Parser {
  static async load(target: Target): Promise<Parser> {
    const tsParser = await createTreeSitterParser(target);
    return new Parser(tsParser, target);
  }

  private constructor(
    private tsParser: TreeSitterParser,
    public target: Target
  ) {}

  parse(
    input: string | TreeSitterParser.Input,
    previousTree?: TreeSitterParser.Tree,
    options?: TreeSitterParser.Options
  ): TreeSitterParser.Tree {
    return this.tsParser.parse(input, previousTree, options);
  }

  parsePattern(
    code: string,
    args: TemplateArg[] = [],
    blocks: TemplateBlock[] = [],
    contextVariables: TemplateContextVariable[] = [],
    isExpression = false
  ): PatternNode {
    return parsePattern(
      code,
      this.tsParser,
      args,
      blocks,
      contextVariables,
      isExpression
    );
  }

  /**
   * Builds a Statement Pattern
   * @param template String pices of the template
   * @param params Active nodes in the pattern
   * @returns Tuple of a PatternNode and PatternDraft
   */
  statementPattern(
    template: TemplateStringsArray,
    ...params: (string | TemplateParam)[]
  ): [PatternNode, PatternDraft] {
    return pattern(template, params, this.tsParser, this.target, false);
  }

  /**
   * Builds an Expression Pattern
   * @param template String pices of the template
   * @param params Active nodes in the pattern
   * @returns Tuple of a PatternNode and PatternDraft
   */
  expressionPattern(
    template: TemplateStringsArray,
    ...params: (string | TemplateParam)[]
  ): [PatternNode, PatternDraft] {
    return pattern(template, params, this.tsParser, this.target, true);
  }
}
