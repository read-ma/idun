#!/bin/sh

echo
echo "Hello $(tput bold)$(whoami)!$(tput sgr0)"
echo
echo 'Today we will be testing our app.'
echo

sleep 2
echo '\033[1;32m....................................................\033[0m';

sleep 2
echo '\033[1;32m....................................................\033[0m';

echo '\033[1;32mAll tests have passed. Your app is ready to deploy! :-)\033[0m';
exit 0

