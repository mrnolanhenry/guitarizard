import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Base16Theme } from '../../colors/themes';

interface ICustomTooltipProps {
    backgroundColor?: string;
    children: React.ReactElement;
    showTooltip: boolean;
    theme: Base16Theme;
    title: React.ReactNode;
  }

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const CustomTooltip = (props: ICustomTooltipProps) => {
    const { children, showTooltip, title } = props;
    return showTooltip ? <StyledTooltip title={title}>{children}</StyledTooltip> : <>{children}</>;
}

export {CustomTooltip};
