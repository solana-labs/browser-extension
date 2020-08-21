#!/usr/bin/env bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

option=""

main() {
  pushd "$ROOT" &> /dev/null

  while getopts "ho:" opt; do
    case $opt in
      h) usage && exit 0;;
      o) option="$OPTARG";;
      \?) usage_error "Invalid option: -$OPTARG";;
    esac
  done
  shift $((OPTIND-1))

  id="$1";
  if [[ $id == "" ]]; then
    if [[ -n "$SOLANA_EXTENSION_ID" ]]; then
      id="$SOLANA_EXTENSION_ID"
    else
      usage_error "parameter <id> is required"
    fi
  fi

  open_browser "chrome-extension://$id/_generated_background_page.html"
  open_browser "chrome-extension://$id/index.html"
}

# usage open_browser <url>
open_browser() {
  browser_bin="${BROWSER_BIN:-chrome}"
  if [[ "$OSTYPE" == "darwin"* ]]; then
    browser_bin="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  fi

  "$browser_bin" "$1"
}

usage_error() {
  message="$1"
  exit_code="$2"

  echo "ERROR: $message"
  echo ""
  usage
  exit ${exit_code:-1}
}

usage() {
  echo "usage: open_ext <id>"
  echo ""
  echo "Open background page and popup of the extension inside Chrome browser."
  echo ""
  echo "*Important* Only works with Chrome for now"
  echo ""
  echo ""
  echo "Options"
  echo "    -h            Display help about this script"
  echo ""
  echo "Environment Variables"
  echo "    BROWSER_BIN   The binary to use to launch chrome"
}

main "$@"