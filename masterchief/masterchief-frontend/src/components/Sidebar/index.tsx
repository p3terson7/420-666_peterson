import React from 'react';
import { Collapse } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import './Dashboard.css';

interface Props {
    isOpen: boolean;
    handleBuildClick: () => void;
}

const CollapsibleSidebar = ({ isOpen, handleBuildClick }: Props) => {
    return (
        <Collapse in={isOpen}>
            <div className={`dashboard ${isOpen ? 'open' : ''}`}>
                <Sidebar
                    className="sidebar"
                    rootStyles={{
                        [`.${sidebarClasses.container}`]: {
                            backgroundColor: 'rgba(32, 34, 37, 0.9)',
                            border: 'none',
                            color: 'white',
                            padding: '9px',
                            textTransform: 'uppercase',
                            fontSize: 15,
                            letterSpacing: '1px',
                            fontWeight: 300,
                        },
                    }}
                    style={{ width: isOpen ? '100%' : '0', borderRight: 'none'}}
                >
                    <Menu>
                        <MenuItem className="menu-item" onClick={handleBuildClick}>Make your Build!</MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        </Collapse>
    );
};

export default CollapsibleSidebar;
