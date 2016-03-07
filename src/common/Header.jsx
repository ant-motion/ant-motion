import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TweenOne from 'rc-tween-one';

const navArr = require('./list').nav;

class Header extends React.Component {
  constructor() {
    super(...arguments);
    this.num = this.getNum(this.props);
    this.startStyle = {
      transform: `translateX(${this.num * 90}px)`,
    };
    this.state = {
      barAnim: { opacity: 1 },
    };
    [
      'getNum',
      'navOver',
      'navOut',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.num = this.getNum(nextProps);
    const barAnim = {
      x: this.num * 90,
      opacity: 1,
      duration: 300,
    };
    this.setState({
      barAnim,
    });
  }

  getNum(props) {
    let num = 0;
    navArr.map((item, i) => {
      if (props.activeKey === item.key || (props.activeKey === '' && i === 0)) {
        num = i;
      }
    });
    return num;
  }

  navOver(e) {
    clearTimeout(this.setTimeOut);
    const dom = e.target;
    const barAnim = {
      x: dom.offsetLeft,
      opacity: 1,
      duration: 300,
    };
    this.setState({
      barAnim,
    });
  }

  navOut() {
    const barAnim = {
      x: this.num * 90,
      opacity: 1,
      duration: 300,
    };
    this.setTimeOut = setTimeout(() => {
      this.setState({
        barAnim,
      });
    }, 300);
  }

  render() {
    const navToRender = navArr.map((item, i) => {
      let className = this.props.activeKey === item.key ? 'active' : '';
      className = className === '' && !this.props.activeKey && i === 0 ? 'active' : className;
      const _item = (<li key={item.key}>
        <Link to={item.href} className={className}
          disabled={item.disabled}
          onMouseOver={this.navOver}
          onMouseOut={this.navOut}
        >
          {item.name}
        </Link>
      </li>);
      return _item;
    });
    return (<TweenOne
      className={this.props.className}
      animation={{ opacity: 1 }}
      style={{ opacity: 0 }}
    >
      <TweenOne className={`${this.props.className}-logo`}
        animation={{ x: '0', opacity: 1, duration: 800 }}
        style={{ transform: 'translateX(-30px)', opacity: 0 }}
      >
        <Link to="/" key="logo">
          <img height="33" src="https://os.alipayobjects.com/rmsportal/xmffOECeJNyecDZ.svg" />
        </Link>
      </TweenOne>
      <TweenOne component="nav"
        className={`${this.props.className}-nav`}
        animation={{ x: '0', opacity: 1, duration: 800 }}
        style={{ transform: 'translateX(30px)', opacity: 0 }}
      >
        <TweenOne component="span"
          className={`${this.props.className}-bar`}
          animation={this.state.barAnim}
          style={this.startStyle}
        />
        <ul>
          {navToRender}
        </ul>
      </TweenOne>
    </TweenOne>);
  }
}
const objectOrArray = React.PropTypes.oneOfType([PropTypes.string, PropTypes.array]);
Header.propTypes = {
  className: PropTypes.string,
  activeKey: objectOrArray,
};

Header.defaultProps = {
  className: 'header',
};

export default Header;
