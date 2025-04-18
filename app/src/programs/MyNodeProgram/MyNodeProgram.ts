
// IMPORT
// Sigma.js
import { NodeCircleProgram } from "sigma/rendering";
import { Settings } from "sigma/settings";
import { NodeDisplayData, PartialButFor } from "sigma/types";

/*
  Node program with modified label showing.

  First row (until first newline char) is visible.
  Entire label is visible only on mouse hover.
*/
export default class MyNodeProgram extends NodeCircleProgram {
    drawLabel = function func (
        context: CanvasRenderingContext2D,
        data: PartialButFor<NodeDisplayData, "x" | "y" | "size" | "label" | "color">,
        settings: Settings,
      ): void {
        if (!data.label) return;

        // Parsing label to rows
        let rows = data.label.split("\n");
        
        // Drawing only first row
        const size = settings.labelSize,
          font = settings.labelFont,
          weight = settings.labelWeight;
      
        context.font = `${weight} ${size}px ${font}`;      
        context.fillStyle = "#000";
        context.fillText(rows[0], data.x + data.size + 3, data.y + size / 3);
      };

    drawHover = function func (
      context: CanvasRenderingContext2D,
      data: PartialButFor<NodeDisplayData, "x" | "y" | "size" | "label" | "color">,
      settings: Settings,
    ): void {
      if (!data.label) return;

      // Parsing label to rows
      let rows = data.label.split("\n");
      let numRows = rows.length;

      // Preparing drawing
      const size = settings.labelSize,
        font = settings.labelFont,
        weight = settings.labelWeight;
    
      context.font = `${weight} ${size}px ${font}`;

      // Counting width of the longest row
      let maxWidth = -1;
      for (let row of rows) {
        let rowWidth = context.measureText(row).width;
        if (rowWidth > maxWidth) {
          maxWidth = rowWidth;
        }
      }
      const width = maxWidth + 8;
      
      // Drawing background rectangle
      context.fillStyle = "#000000";
      context.fillRect(data.x + data.size, data.y + size / 3 - 15, width, numRows * 20);

      // Drawing row by row
      context.fillStyle = "#ffffff";
      for (let i = 0; i < numRows; i++) {
        context.fillText(rows[i], data.x + data.size + 3, data.y + (4 * i + 1) * (size / 3));
      }
      
    }
}