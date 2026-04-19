// Gamepad Tester - Lightweight HTML5 Gamepad API handler

class GamepadTester {
  constructor() {
    this.gamepads = {};
    this.animationFrame = null;

    window.addEventListener("gamepadconnected", (e) => {
      console.log("Gamepad connected:", e.gamepad.id);
      this.start();
    });

    window.addEventListener("gamepaddisconnected", (e) => {
      console.log("Gamepad disconnected:", e.gamepad.id);
      delete this.gamepads[e.gamepad.index];
    });
  }

  start() {
    if (!this.animationFrame) {
      this.update();
    }
  }

  update() {
    const pads = navigator.getGamepads
      ? navigator.getGamepads()
      : [];

    for (let i = 0; i < pads.length; i++) {
      const gp = pads[i];
      if (!gp) continue;

      this.gamepads[gp.index] = gp;

      this.handleGamepad(gp);
    }

    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }

  handleGamepad(gp) {
    console.clear();
    console.log("🎮 Gamepad:", gp.id);

    // Buttons
    gp.buttons.forEach((btn, index) => {
      if (btn.pressed) {
        console.log(`Button ${index}: PRESSED`);
      }
    });

    // Sticks
    const lx = gp.axes[0].toFixed(2);
    const ly = gp.axes[1].toFixed(2);
    const rx = gp.axes[2] ? gp.axes[2].toFixed(2) : 0;
    const ry = gp.axes[3] ? gp.axes[3].toFixed(2) : 0;

    console.log("Left Stick:", lx, ly);
    console.log("Right Stick:", rx, ry);

    // Triggers (common mapping)
    const lt = gp.buttons[6] ? gp.buttons[6].value : 0;
    const rt = gp.buttons[7] ? gp.buttons[7].value : 0;

    console.log("Triggers → LT:", lt, "RT:", rt);
  }
}

// Auto start
window.GamepadTester = new GamepadTester();
