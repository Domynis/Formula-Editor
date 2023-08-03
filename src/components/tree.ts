interface NodeData {
  name: string;
  params?: Array<number | NodeData>;
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
    let index = 0;
    let level = 0;

    for (const char of input) {
      if (char === "(") {
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
          level++;
        }
      } else if (char === ",") {
        if (currentNumber !== "") {
          stack[stack.length - 1].addChild(
            new TreeNode({ name: currentNumber }, index - currentNumber.length)
          );
          currentNumber = "";
        }
      } else if (char === ")") {
        if (currentNumber !== "") {
          stack[stack.length - 1].addChild(
            new TreeNode({ name: currentNumber }, index - currentNumber.length)
          );
          currentNumber = "";
        }
        if (index != input.length - 1) {
          stack.pop();
          level--;
        }
      } else {
        if (this.isNumeric(char)) {
          currentNumber += char;
        } else {
          currentFunction += char;
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
