import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

const NavigationMenu = () => {
    const navigate = useNavigate();
    const items: MenuItem[] = [
        {
            label: 'Início',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Pessoas',
            icon: 'pi pi-user',
            command: () => navigate('/pessoas')
        
        },
        {
            label: 'Pedidos',
            icon: 'pi pi-list',
            command: () => navigate('/pedidos')
        },
        {
            label: 'Pagamentos',
            icon: 'pi pi-dollar',
            command: () => navigate('/pagamentos')
        },
        {
            label: 'Sobre',
            icon: 'pi pi-info-circle',
            command: () => navigate('/about')
        },
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
};

export default NavigationMenu;
