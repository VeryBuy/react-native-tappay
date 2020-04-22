require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-tap-pay"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                    react-native-tap-pay
                   DESC
  s.homepage     = "https://github.com/github_account/react-native-tap-pay"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "Your Name" => "yourname@email.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/github_account/react-native-tap-pay.git", :tag => "#{s.version}" }

  s.source_files = "ios/*.{h,m,swift}"
  s.public_header_files = "ios/*.h"
  s.requires_arc = true

  s.vendored_frameworks = "ios/TPDirect.framework"
  s.resource = "ios/TPDirectResource/Image/*"
  s.dependency "React"
  s.swift_version = "4.0"
  # ...
  # s.dependency "..."
end

