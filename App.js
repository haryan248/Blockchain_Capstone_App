import * as React from "react"
import { WebView } from "react-native-webview"
import { Platform, BackHandler } from "react-native"
export default class App extends React.Component {
	webView = { canGoBack: false, ref: null }
	onAndroidBackPress = () => {
		if (this.webView.canGoBack && this.webView.ref) {
			this.webView.ref.goBack()
			return true
		}
		return false
	}
	componentDidMount() {
		if (Platform.OS === "android") {
			BackHandler.addEventListener("hardwareBackPress", this.onAndroidBackPress)
		}
	}
	componentWillUnmount() {
		if (Platform.OS === "android") {
			BackHandler.removeEventListener("hardwareBackPress")
		}
	}
	render() {
		return (
			<WebView
				source={{ uri: "https://www.kyonggiupass.com/login" }}
				userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
				style={{ marginTop: 20 }}
				thirdPartyCookiesEnabled={true}
				sharedCookiesEnabled={true}
				ref={(webView) => {
					this.webView.ref = webView
				}}
				onNavigationStateChange={(navState) => {
					this.webView.canGoBack = navState.canGoBack
				}}
			/>
		)
	}
}
