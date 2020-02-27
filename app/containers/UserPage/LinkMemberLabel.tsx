import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../components/Text';

interface IProps {
  username: string;
  children: React.ReactNode | string;
}

const LinkMemberLabel = (props: IProps) => {
  const { children, username } = props;
  return (
    <Link to={`/users/manage/${username}`}>
      <Text color="primary" fontWeight="bold">
        {children}
      </Text>
    </Link>
  );
};
export default LinkMemberLabel;
