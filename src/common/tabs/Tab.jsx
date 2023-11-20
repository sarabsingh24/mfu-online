import React from 'react';
import { StepBox, StepCount, StepText } from './CommonTab-style';

//icons
import { FaBriefcase } from 'react-icons/fa'; // CAN
import { FaUserAlt } from 'react-icons/fa'; //Primary holder
import { RiBankLine } from 'react-icons/ri'; //bank account
import { FaStreetView } from 'react-icons/fa'; //nomaniee
import { MdPhotoLibrary } from 'react-icons/md'; //proofe
import { HiUsers } from 'react-icons/hi'; //second holder
import { RiParentFill } from 'react-icons/ri'; //gurdian holder //gurdian holder

function Tab({ step }) {
  const { active, text, show, short } = step;

  let icon = '';

  // eslint-disable-next-line default-case
  switch (short) {
    case 'CRI':
      icon = <FaBriefcase />;
      break;
    case 'PRIM':
      icon = <FaUserAlt />;
      break;
    case 'SEC':
      icon = <HiUsers />;
      break;
    case 'THIR':
      icon = <HiUsers />;
      break;
    case 'GUAR':
      icon = <RiParentFill />;
      break;
    case 'BANK':
      icon = <RiBankLine />;
      break;
    case 'NOMI':
      icon = <FaStreetView />;
      break;
    case 'PROO':
      icon = <MdPhotoLibrary />;
      break;
  }

  return (
    <StepBox
      className={active ? 'tab-active' : ''}
      style={{ display: show ? 'block' : 'none' }}
    >
      <StepCount className={active ? 'tab-active' : ''}>{icon}</StepCount>
      <StepText>{text}</StepText>
    </StepBox>
  );
}

export default Tab;
