import React from 'react';
import Browser from '../src/components/Browser';
import { useLocale } from '../src/hooks/useLocale';

export default {
  component: Browser,
  subcomponents: {  }
};


function PrintLocale() {
  const locale = useLocale();
  return (
    <div>
      <h1>Locale:</h1>
      <p>{locale}</p>
    </div>
  );
}

export const Locale = {
  render: (args) => (
    <Browser>
        <PrintLocale />
    </Browser>
  ),
};
