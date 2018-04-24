const express = require('express');
const component = {
    app:express(),
    start:async () => {
      component.server = await component.app.listen();
    },
    stop:async () => {
      return await component.server.close();
    }
}

module.exports = component;