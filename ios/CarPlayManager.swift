//
//  CarPlayManager.swift
//  medjugorje
//
//  Created by Apple  on 21/10/2024.
//

import Foundation
import MediaPlayer
import AVFoundation

@objc(CarPlayManager)
class CarPlayManager: NSObject {
  
  private var player: AVPlayer?
  private let streamURL = URL(string: "https://ais-sa3.cdnstream1.com/2600_128.aac")!
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func setupCarPlay() {
    let commandCenter = MPRemoteCommandCenter.shared()
    
    commandCenter.playCommand.addTarget { [weak self] _ in
      self?.play()
      return .success
    }
    
    commandCenter.pauseCommand.addTarget { [weak self] _ in
      self?.pause()
      return .success
    }
    
    setupNowPlaying()
    setupAudioSession()
  }
  
  private func setupNowPlaying() {
    var nowPlayingInfo = [String: Any]()
    nowPlayingInfo[MPMediaItemPropertyTitle] = "Your Radio Station Name"
    nowPlayingInfo[MPMediaItemPropertyArtist] = "Live Stream"
    
    if let image = UIImage(named: "station_logo") {
      nowPlayingInfo[MPMediaItemPropertyArtwork] =
        MPMediaItemArtwork(boundsSize: image.size) { size in
          return image
      }
    }
    
    MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
  }
  
  private func setupAudioSession() {
    do {
      try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
      try AVAudioSession.sharedInstance().setActive(true)
    } catch {
      print("Failed to set up audio session: \(error)")
    }
  }
  
  private func play() {
    if player == nil {
      player = AVPlayer(url: streamURL)
    }
    player?.play()
    updatePlayingState(isPlaying: true)
  }
  
  private func pause() {
    player?.pause()
    updatePlayingState(isPlaying: false)
  }
  
  private func updatePlayingState(isPlaying: Bool) {
    var nowPlayingInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [:]
    nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0
    MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
  }
}
