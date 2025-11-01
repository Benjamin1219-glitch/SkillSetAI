import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';
import './BounceCards.css';

export default function BounceCards({
  className = '',
  items = [], // Now accepts feature items instead of images
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = true
}) {
  const containerRef = useRef(null);
  const { colors, isDark } = useTheme();

  useEffect(() => {
    if (!containerRef.current) {
      console.log('BounceCards: containerRef is null');
      return;
    }
    
    const cards = containerRef.current.querySelectorAll('.bounce-card');
    console.log('BounceCards: Found', cards.length, 'cards');
    
    if (cards.length === 0) {
      console.log('BounceCards: No cards found!');
      return;
    }
    
    gsap.fromTo(
      cards,
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
        onComplete: () => console.log('BounceCards: Animation complete')
      }
    );
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = transformStr => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = hoveredIdx => {
    if (!enableHover || !containerRef.current) return;
    
    items.forEach((_, i) => {
      const card = containerRef.current.querySelector(`.bounce-card-${i}`);
      if (!card) return;
      
      gsap.killTweensOf(card);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(card, {
          transform: noRotationTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(card, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto'
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    
    items.forEach((_, i) => {
      const card = containerRef.current.querySelector(`.bounce-card-${i}`);
      if (!card) return;
      
      gsap.killTweensOf(card);
      const baseTransform = transformStyles[i] || 'none';
      gsap.to(card, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`bounceCardsContainer ${className}`}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight
      }}
    >
      {items.map((item, idx) => {
        console.log(`Rendering card ${idx}:`, item.title);
        return (
          <div
            key={idx}
            className={`bounce-card bounce-card-${idx} transition-colors duration-500`}
            style={{
              transform: transformStyles[idx] ?? 'none',
              borderColor: isDark ? colors.glassBorder : 'rgba(0, 0, 0, 0.2)',
              background: isDark ? colors.glassBg : 'rgba(255, 255, 255, 0.5)',
              boxShadow: isDark ? '0 10px 30px rgba(128, 128, 128, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.15)'
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            {/* Icon */}
            <div className="bounce-card-icon transition-colors duration-500" style={{ color: colors.text }}>
              {item.icon}
            </div>
            
            {/* Title */}
            <h3 className="bounce-card-title transition-colors duration-500" style={{ color: colors.text }}>
              {item.title}
            </h3>
            
            {/* Description */}
            {item.description && (
              <p className="bounce-card-description transition-colors duration-500" style={{ color: colors.textSecondary }}>
                {item.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
