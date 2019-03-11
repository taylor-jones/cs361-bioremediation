(function () {
  // Helpers
  const qs = document.querySelector.bind(document);
  const qsa = document.querySelectorAll.bind(document);

  // Cache DOM elements
  let icons = qsa('#radar-icons path');
  const radius = qs('#radar-radius');
  const gradient = qs('#radar-gradient');
  const hand = qs('#radar-hand');

  TweenMax.set(icons, {
    transformOrigin: 'center',
    opacity: 0,
    scale: 0.5,
  });

  TweenMax.set(radius, {
    transformOrigin: 'center',
    scale: 0.1,
    opacity: 0,
  });

  new TimelineMax({
    repeat: -1,
    repeatDelay: 1,
  })
    .to(radius, 0.5, {
      opacity: 0.1,
    })
    .to(
      radius,
      2,
      {
        scale: 3.7,
      },
      '-=.5',
    )
    .to(
      radius,
      0.5,
      {
        opacity: 0,
      },
      '-=.5',
    );

  TweenMax.to(hand, 3, {
    transformOrigin: 'center bottom',
    rotation: 360,
    ease: Power0.easeOut,
    repeat: -1,
  });

  TweenMax.to(gradient, 3, {
    transformOrigin: 'center',
    rotation: 360,
    ease: Power0.easeOut,
    repeat: -1,
  });

  icons = [].map.call(icons, i => i).reverse();
  [].forEach.call(icons, (icon, index) => {
    new TimelineMax({
      repeat: -1,
      delay: index * 0.3,
      repeatDelay: 1.75,
    })
      .to(icon, 0.5, {
        opacity: 0.8,
      })
      .to(
        icon,
        1.25,
        {
          scale: 1.25,
        },
        '-=.5',
      )
      .to(
        icon,
        0.5,
        {
          opacity: 0,
        },
        '-=.5',
      );
  });
}());
