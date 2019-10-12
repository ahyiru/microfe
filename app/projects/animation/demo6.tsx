import * as React from 'react';

import './demo6.less';

/*export default class Demo6 extends React.Component<any,any> {

  state={
    hover:'',
  };

  mouseEnter=()=>{
    this.setState({
      hover:' hover',
    });
  };
  mouseLeave=()=>{
    this.setState({
      hover:'',
    });
  };
  showMore=(id)=>{
    if(id==1){
      
    }
    if(id==2){
      
    }
    if(id==3){
      
    }
  };

  render() {
    const {hover}=this.state;
    let ballClass=`ball${hover}`;
    return (
      <div>
        <div className="ani-demo">
          <div className="ani-center">
            <i className="fa fa-laptop"/>
          </div>
          <div className={`ani-container${hover}`}>
            <div className="ani-track"/>
            
            <div className="ani-item i1">
              <div className={ballClass} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.showMore.bind(this,'1')}>
                <i className="fa fa-laptop">
                  <span>application</span>
                </i>
              </div>
            </div>
            <div className="ani-item i2">
              <div className={ballClass} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.showMore.bind(this,'2')}>
                <i className="fa fa-volume-up">
                  <span>journal</span>
                </i>
              </div>
            </div>
            <div className="ani-item i3">
              <div className={ballClass} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.showMore.bind(this,'3')}>
                <i className="fa fa-unlink">
                  <span>about</span>
                </i>
              </div>
            </div>
          </div>
        </div>
        {
          true&&
          <div className="float-layer">
            <div className="tab">
              {
                true&&
                <div className="tab1"/>
              }
              {
                false&&
                <div className="tab2"/>
              }
              {
                false&&
                <div className="tab3"/>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}*/
