onmessage = e => {
    const message = e.data;
    console.log(`[From Main]: ${message}`);
    // const reply = setTimeout(() => postMessage("Polo!"), 3000);
  };

//   postMessage("Polo!");