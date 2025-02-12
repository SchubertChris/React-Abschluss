import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Categories.scss';

export default function Categories() {
  return (
    <div className="grid">
      <Link to="/shop/market-analysis" className="market-analysis">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>Market Analysis</span>
        <div className="overlay"></div>
      </Link>
      <Link to="/shop/trading-bots" className="trading-bots">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>Trading Bots</span>
        <div className="overlay"></div>
      </Link>
      <Link to="/shop/portfolio-management" className="portfolio-management">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>Portfolio Management</span>
        <div className="overlay"></div>
      </Link>
      <Link to="/shop/risk-assessment" className="risk-assessment">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>Risk Assessment</span>
        <div className="overlay"></div>
      </Link>
      <Link to="/shop/backtesting" className="backtesting">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>Backtesting</span>
        <div className="overlay"></div>
      </Link>
      <Link to="/shop/strategy-development" className="strategy-development">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>Strategy Development</span>
        <div className="overlay"></div>
      </Link>
      <Link to="/shop/market-news" className="market-news">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>Market News</span>
        <div className="overlay"></div>
      </Link>
      <Link to="/shop/signals" className="signals">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>Signals</span>
        <div className="overlay"></div>
      </Link>
      <Link to="/shop/education" className="education">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>Education</span>
        <div className="overlay"></div>
      </Link>
      <Link to="/shop/support" className="support">
        <div className="blur-bg"></div>
        <span className="shop">Shop</span>
        <span>1 to 1 Coaching</span>
        <div className="overlay"></div>
      </Link>
    </div>
  );
}
