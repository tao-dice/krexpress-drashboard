import * as React from 'react';
import { Helmet } from 'react-helmet';

export default function ContainerPage() {
  return (
    <div>
      <Helmet>
        <title>รายการตู้สินค้า</title>
        <meta
          name="description"
          content="รายการตู้สินค้า"
        />
      </Helmet>
    </div>
  );
}
