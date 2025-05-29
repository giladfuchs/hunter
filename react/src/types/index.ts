import React, { FunctionComponent, ReactElement } from 'react';
import { PaletteMode, SvgIconTypeMap, SnackbarOrigin, ChipProps } from '@mui/material';
import { Property } from 'csstype';

import { OverridableComponent } from '@mui/material/OverridableComponent';

import { TablerIcon } from '@tabler/icons';
import { ModelState } from '../store/modelSlice';

export * from './general';
export * from './table';

export interface GenericCardProps {
    title?: string;
    primary?: string | number | undefined;
    secondary?: string;
    content?: string;
    image?: string;
    dateTime?: string;
    iconPrimary?: OverrideIcon;
    color?: string;
    size?: string;
}

export type OverrideIcon =
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
          muiName: string;
      })
    | React.ComponentClass<any>
    | FunctionComponent<any>
    | TablerIcon;

export type NavItemType = {
    id?: string;
    icon?: GenericCardProps['iconPrimary'];
    target?: boolean;
    external?: string;
    url?: string | undefined;
    type?: string;
    title?: React.ReactNode | string;
    color?: 'primary' | 'secondary' | 'default' | undefined;
    caption?: React.ReactNode | string;
    breadcrumbs?: boolean;
    disabled?: boolean;
    chip?: ChipProps;
};

export interface CustomizationStateProps {
    isOpen: NavItemType[];
    type?: string;
    id?: string;
    navType: PaletteMode;
    presetColor: string;
    locale: string;
    rtlLayout: boolean;
    opened: boolean;
    fontFamily: Property.FontFamily;
    borderRadius?: number;
    outlinedFilled: boolean;
    openDrawer: boolean;
}

export interface SnackbarStateProps {
    action: boolean;
    open: boolean;
    message: string;
    anchorOrigin: SnackbarOrigin;
    variant: string;
    alertSeverity: 'error' | 'warning' | 'success';
    transition: string;
    close: boolean;
    actionButton: boolean;
}

export interface DefaultRootStateProps {
    customization: CustomizationStateProps;
    snackbar: SnackbarStateProps;
    models: ModelState;
}

export interface ColorProps {
    readonly [key: string]: string;
}

export type GuardProps = {
    children: ReactElement | null;
};

export interface StringColorProps {
    id?: string;
    label?: string;
    color?: string;
    primary?: string;
    secondary?: string;
}

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

export interface initialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized: boolean;
}
