import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Layout, { Content, Footer } from "antd/lib/layout/layout";
import { Suspense, useEffect } from "react";
import LeftSider from "../components/LeftSider";
import LayoutHeader from "../components/LayoutHeader";
import { localStorage } from "../utils";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const LayoutContent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem("login"));
    if (!isLogin) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout className="h-full">
      <LeftSider />
      <LayoutChildren />
    </Layout>
  );
};
const LayoutChildren = () => {
  const transitionKey = useLocation();

  return (
    <Layout className="relative">
      <LayoutHeader />
      <Content className="relative p-5">
        <Suspense fallback={<div>Loading...</div>}>
          <TransitionGroup component={null}>
            <CSSTransition
              key={transitionKey.pathname}
              classNames="my-node"
              addEndListener={(node, done) =>
                node.addEventListener("transitionend", done, false)
              }
              unmountOnExit
            >
              <Outlet />
            </CSSTransition>
          </TransitionGroup>
        </Suspense>
      </Content>
      <Footer className="text-gray-500 text-center select-none">
        推荐使用Chrome浏览器，可以获得最佳页面体验。
      </Footer>
    </Layout>
  );
};
export default LayoutContent;
