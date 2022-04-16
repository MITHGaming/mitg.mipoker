import * as S from './styles';

export const Layout: React.FC = ({ children }) => {
  return <S.LayoutWrapper id="layout-wrapper">{children}</S.LayoutWrapper>;
};

export default Layout;
