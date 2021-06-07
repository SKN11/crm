import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'



const NavigationItems  = (props) => {
   
    let cls = classes.NavigationItems;
    if(props.where)
    cls= classes.SideDrawer;

    const navItems = Object.keys(props.element).map(
        (igKey)=>{
            let nav = null; 
            if(props.element[igKey].show)   
                {
                nav = (<NavigationItem key= {igKey} link={props.element[igKey].link}>
                {igKey}
            </NavigationItem>
                )
                }
            return (
                nav
            );
        }

    );



   return ( <ul className={cls}>
        {navItems}
        
    </ul>
   );
}


export default NavigationItems;
