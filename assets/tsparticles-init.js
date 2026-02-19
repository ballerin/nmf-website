(async () => {
  // tsParticles v2-compatible initialization (no preset required)
  await tsParticles.load("tsparticles",
    {
      background: { color: '#FFFFFF' },
      particles: {
        number: { value: 40, density: { enable: true, area: 800 } },
        color: { value: '#000000' },
        opacity: { value: 0.5 },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          straight: false,
          bounce: false,
          outModes: { default: 'out' }
        },
        links: {
          enable: true,
          color: '#999999',
          distance: 200,
          opacity: 0.5,
          width: 1
        }
      },
      interactivity: {
        detectsOn: 'window',
        events: { resize: true }
      }
    }
  );
})();
