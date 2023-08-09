interface NodeData {
  name: string;
}

export class TreeNode {
  data: NodeData;
  children: TreeNode[];
  indexInInput: number;

  constructor(data: NodeData, indexInput: number) {
    this.data = data;
    this.children = [];
    this.indexInInput = indexInput;
  }

  addChild(child: TreeNode): void {
    this.children.push(child);
  }

  static isNumeric(value: string): boolean {
    return !isNaN(Number(value));
  }

  static parseTreeFromString(input: string): TreeNode | null {
    const stack: TreeNode[] = [];
    let currentNumber = "";
    let currentFunction = "";

    let isLastSeparatorAClosingBracket = false;
    const specialCharsForNumbers = "[];.";

    let index = 0;
    let level = 0;
    input = input.trimEnd();

    for (const char of input) {
      switch (char) {
        case "(": {
          if (currentFunction !== "") {

            const newNode = new TreeNode(
              { name: currentFunction },
              index - currentFunction.length
            );
            if (stack.length > 0) {
              stack[stack.length - 1].addChild(newNode);
            }
            stack.push(newNode);
            currentFunction = "";
            currentNumber = "";
            level++;
          }
          isLastSeparatorAClosingBracket = false;
          break;
        }
        case ",": {
          if (currentNumber !== "") {
            if (!(isLastSeparatorAClosingBracket && currentNumber.trim() === "") && stack.length) {
              stack[stack.length - 1].addChild(
                new TreeNode({ name: currentNumber }, index - currentNumber.length)
              );
            }

            currentNumber = "";
            currentFunction = "";
          }
          isLastSeparatorAClosingBracket = false;
          break;
        }
        case ")": {
          if (currentNumber !== "" && stack.length) {
            if (!(isLastSeparatorAClosingBracket && currentNumber.trim() === "") && stack.length) {
              stack[stack.length - 1].addChild(
                new TreeNode({ name: currentNumber }, index - currentNumber.length)
              );
            }
            currentNumber = "";
            currentFunction = "";
            if (index != input.length - 1) {
              stack.pop();
              level--;
            }
          }

          isLastSeparatorAClosingBracket = true;
          break;
        }
        default: {
          if (char == " ") {
            currentNumber += " ";
            currentFunction += " ";
          }
          else if (this.isNumeric(char) || specialCharsForNumbers.includes(char)) {
            currentNumber += char;
          } else {
            currentFunction += char;
          }
          if (index == input.length - 1 && stack.length) {
            const currentData = currentNumber.length >= currentFunction.length ? currentNumber : currentFunction;
            stack[stack.length - 1].addChild(
              new TreeNode({ name: currentData }, index - currentData.length + 1)
            );
          }
          break;
        }
      }
      index++;
    }

    return stack[0];
  }

  displayLevels(root: TreeNode, level = 0): void {
    if (root) {
      console.log(`Level ${level}: ${root.data.name} ${root.indexInInput}`);
      for (const child of root.children) {
        this.displayLevels(child, level + 1);
      }
    }
  }
}
